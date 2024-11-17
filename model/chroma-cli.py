# %%
import argparse
import os
import shutil
from langchain.document_loaders.pdf import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema.document import Document
#from get_embedding_function import get_embedding_function
from langchain.vectorstores.chroma import Chroma
import pytesseract
from PIL import Image


CHROMA_PATH = "chroma"
DATA_PATH = "data"


def main():

    parser = argparse.ArgumentParser()
    parser.add_argument("--reset", action="store_true", help="Reset the database.")
    args = parser.parse_args()
    if args.reset:
        confirmationParser = argparse.ArgumentParser()
        print("Resetting vector store. This will delete all existing data.")
        confirmationParser.add_argument("--confirm", action="store_true", help="Confirm the reset.")
        if args.confirm:
            print("Reset confirmed.")
            clear_database()

    documents = load_documents()
    print(documents)
    chunks = split_documents(documents)
    print("sample chunks")
    print("0", chunks[0])
    print("1", chunks[1])
    print("2", chunks[2])
    print("3", chunks[3])
    print("4", chunks[4])
    print("5", chunks[5])
    print("6", chunks[6])
    print("7", chunks[7])
    print("8", chunks[8])
    print("15", chunks[100])
    #add_to_chroma(chunks)

def extract_text_from_image(image_path, language='eng'):
        img = Image.open(image_path)
        
        text = pytesseract.image_to_string(img, lang=language)
        
        return text

def load_documents():
    document_loader = PyPDFDirectoryLoader(DATA_PATH)
    return document_loader.load()


def split_documents(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=80,
        length_function=len,
        is_separator_regex=False,
    )
    return text_splitter.split_documents(documents)


def add_to_chroma(chunks: list[Document]):
    db = Chroma(
        persist_directory=CHROMA_PATH, embedding_function=get_embedding_function()
    )

    chunks_with_ids = calculate_chunk_ids(chunks)

    existing_items = db.get(include=[])
    existing_ids = set(existing_items["ids"])
    print(f"Number of existing documents in DB: {len(existing_ids)}")

    new_chunks = []
    for chunk in chunks_with_ids:
        if chunk.metadata["id"] not in existing_ids:
            new_chunks.append(chunk)

    if len(new_chunks):
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
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH) 


if __name__ == "__main__":
    main()


