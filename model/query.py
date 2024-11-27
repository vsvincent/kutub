import argparse
from langchain.prompts import ChatPromptTemplate

from db import get_database, get_embeddings
from openai import OpenAI
from constants import API_KEY

client = OpenAI(api_key=API_KEY)

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}
"""


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    query_rag(query_text)


def query_rag(query_text: str):
    db = get_database()

    results = db.similarity_search_with_score(query_text, k=5)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    print(prompt)

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant Muslim scholars. Respond to the prompt strictly adhering to the context."},
            {"role": "user", "content": prompt},
        ]
    )

    response_text = response.choices[0].message.content.strip()
    print(response_text)

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)
    return response_text


if __name__ == "__main__":
    main()
