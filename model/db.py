import argparse
import os
import shutil
from langchain.schema.document import Document
import chromadb.utils.embedding_functions as embedding_functions
from langchain.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from constants import CHROMA_PATH, API_KEY, DEFAULT_MODEL

def get_embedding_function():
  return embedding_functions.OpenAIEmbeddingFunction(
    api_key=API_KEY,
    model_name=DEFAULT_MODEL
    )

def get_embeddings():
  return OpenAIEmbeddings(
    openai_api_key=API_KEY,
    model=DEFAULT_MODEL  # e.g., "text-embedding-ada-002"
    )

def clear_database():
  confirmationParser = argparse.ArgumentParser()
  print("Resetting vector store. This will delete all existing data.")
  confirmationParser.add_argument("--confirm", action="store_true", help="Confirm the reset.")
  confirmation_args = confirmationParser.parse_args()
  if confirmation_args.confirm:
    print("Reset confirmed.")
    if os.path.exists(CHROMA_PATH):
      shutil.rmtree(CHROMA_PATH)

def add_to_chroma(db: Chroma, chunks: list[Document]):

    existing_items = db.get(include=[])
    existing_ids = set(existing_items["ids"])
    print(f"Number of existing documents in DB: {len(existing_ids)}")

    new_chunks = []
    for chunk in chunks:
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
    else:
        print("No new documents to add")

def get_database():
    if os.path.exists(CHROMA_PATH):
        return Chroma(persist_directory=CHROMA_PATH, embedding_function=get_embeddings(), collection_name="test")
    else:
        raise FileNotFoundError("Chroma database not found at ${CHROMA_PATH}. Please make sure the directory exists and run cli with --init to create a new database.")

def create_database(documents, embeddings):
    print("Creating persistent vector store at:", CHROMA_PATH)
    return Chroma.from_documents(documents, embeddings, persist_directory=CHROMA_PATH, collection_name="test")
