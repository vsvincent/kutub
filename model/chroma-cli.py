# %%
import argparse
import os
import shutil
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema.document import Document
from langchain_openai import OpenAIEmbeddings
import chromadb.utils.embedding_functions as embedding_functions
from langchain_community.vectorstores import Chroma
import pytesseract
from PIL import Image
import random
import uuid


CHROMA_PATH = os.getenv("CHROMA_PATH")
DATA_PATH = "data"
API_KEY = os.getenv("OPENAI_API_KEY")
DEFAULT_MODEL = "text-embedding-3-small"


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
    return text_splitter.split_documents(documents)

def get_embedding_function():
    return embedding_functions.OpenAIEmbeddingFunction(
                api_key=API_KEY,
                model_name=DEFAULT_MODEL
            )

def add_to_chroma(db: Chroma, chunks: list[Document]):
    chunks_with_ids = calculate_chunk_ids(chunks)

    existing_items = db.get(include=[])
    existing_ids = set(existing_items["ids"])
    print(f"Number of existing documents in DB: {len(existing_ids)}")

    new_chunks = []
    for chunk in chunks_with_ids:
        if chunk.metadata["id"] not in existing_ids:
            new_chunks.append(chunk)

    if len(new_chunks):
        db_confirmation_parser = argparse.ArgumentParser()
        db_confirmation_parser.add_argument("--confirm", action="store_true", help="Confirm the uploading of new documents to the vector store.")
        db_confirmation_args = db_confirmation_parser.parse_args()
        if db_confirmation_args.confirm:
          print(f"👉 Adding new documents: {len(new_chunks)}")
          new_chunk_ids = [chunk.metadata["id"] for chunk in new_chunks]
          db.add_documents(new_chunks, ids=new_chunk_ids)
          db.persist()
    else:
        print("No new documents to add")


def calculate_chunk_ids(chunks):
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


def clear_database():
  confirmationParser = argparse.ArgumentParser()
  print("Resetting vector store. This will delete all existing data.")
  confirmationParser.add_argument("--confirm", action="store_true", help="Confirm the reset.")
  confirmation_args = confirmationParser.parse_args()
  if confirmation_args.confirm:
    print("Reset confirmed.")
    if os.path.exists(CHROMA_PATH):
      shutil.rmtree(CHROMA_PATH)

def get_database():
  if os.path.exists(CHROMA_PATH):
    Chroma(persist_directory=CHROMA_PATH, embedding_function=get_embedding_function(), collection_name="test")

def create_database(documents, embeddings):
    print("Creating persistent vector store at:", CHROMA_PATH)
    attributes = dir(documents[0])
    return Chroma.from_documents(documents, embeddings, persist_directory=CHROMA_PATH, collection_name="test")

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


