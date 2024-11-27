# %%
import argparse
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema.document import Document
from langchain_openai import OpenAIEmbeddings
import pytesseract
from PIL import Image
import random
import uuid
from db import clear_database, create_database, get_database, add_to_chroma, CHROMA_PATH, API_KEY, DEFAULT_MODEL

DATA_PATH = "data"

def main():
    if not CHROMA_PATH:
      raise ValueError("CHROMA_PATH environment variable is not set.")
    else:
        print(f"Using local Chroma path: {CHROMA_PATH}")
    if not API_KEY:
      raise ValueError("API_KEY environment variable is not set.")
    else:
        openai = OpenAIEmbeddings(model=DEFAULT_MODEL)
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset", action="store_true", help="Reset the database.")
    parser.add_argument("--init", action="store_true", help="Initialize the database.")
    args = parser.parse_args()
    if args.reset:
        clear_database()
    documents = load_documents()
    chunks = split_documents(documents)
    for chunk in chunks:
        chunk.metadata["id"] = str(uuid.uuid4())
    if args.init:
        db = create_database(chunks, openai)
    else:
        db = get_database()
        add_to_chroma(db, chunks)

def extract_text_from_image(image_path, language='eng'):
        img = Image.open(image_path)
        
        text = pytesseract.image_to_string(img, lang=language)
        
        return text

def load_documents():
    document_loader = PyPDFDirectoryLoader(DATA_PATH)
    documents = []
    for doc in document_loader.lazy_load():
        doc.metadata["id"] = str(uuid.uuid4())
        print("Document Loaded")
        print(doc.metadata["id"])
        documents.append(doc)
    return documents


def split_documents(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=80,
        length_function=len,
        is_separator_regex=False,
    )
    chunks = text_splitter.split_documents(documents)
    return calculate_chunk_ids(chunks)

def calculate_chunk_ids(chunks: list[Document]):
    # Page Source : Page Number : Chunk Index

    last_page_id = None
    current_chunk_index = 0

    for chunk in chunks:
        source = chunk.metadata.get("source")
        page = chunk.metadata.get("page")
        current_page_id = f"{source}:{page}"

        if current_page_id == last_page_id:
            current_chunk_index += 1
        else:
            current_chunk_index = 0

        chunk_id = f"{current_page_id}:{current_chunk_index}"
        last_page_id = current_page_id

        chunk.metadata["id"] = chunk_id

    return chunks

def sample_chunks(chunks, n=5):
  print(f"Total chunks: {len(chunks)}")
  print("Sample chunks:")
  if chunks:
    sample_indices = random.sample(range(len(chunks)), min(n, len(chunks)))
    for i in sample_indices:
      print(f"Sample {i}: {chunks[i]}")
  else:
    print("No chunks to display")

if __name__ == "__main__":
    main()