import os
import glob
import json
import time
import re
from duckduckgo_search import DDGS
from pydantic import BaseModel, Field
import ollama
import httpx

# Usage instructions:
# 1. Install Ollama from https://ollama.com/
# 2. Run: ollama pull llama3.1
# 3. pip install ollama pydantic duckduckgo-search
# 4. python scripts/verify_quotes.py

class QuoteVerificationResult(BaseModel):
    sourcedFrom: str = Field(description="The authoritative URL (e.g. Project Gutenberg, Wikipedia, valid archive) where the exact quote originates from. MUST NOT be a search engine URL (like Google or DuckDuckGo). Empty if not found.")
    isParaphrased: bool = Field(description="True ONLY if the provided quote is a modern paraphrase, summary, altered phrasing, or misattribution. False if the quote matches the authentic phrasing/translation from the original source text.")
    originalQuote: str = Field(description="The exact verbatim quote from the source link (whether authentic or paraphrased). Always provide the original text found in the authoritative source.")

def search_for_quote(quote, author):
    """Uses DuckDuckGo to search for the quote's origin with relaxed fallback."""
    try:
        print(f"  -> Searching DuckDuckGo for: '{quote}' {author}")
        # Search for the exact quote and author with a 20-second timeout
        with DDGS(timeout=20) as ddgs:
            results = ddgs.text(f'"{quote}" {author} source origin', max_results=3)
            if not results:
                # Fallback without strict quotes for longer quotes or slight variations
                clean_q = quote.replace('"', '').strip()
                print(f"  -> No strict results, falling back to relaxed search: '{clean_q}' {author}")
                results = ddgs.text(f'{clean_q} {author} source', max_results=3)

            if not results:
                print("  -> No search results found.")
                return "No search results found."
                
            context = []
            for r in results:
                context.append(f"Source: {r.get('href')}\nSnippet: {r.get('body')}")
            print(f"  -> Found {len(results)} search results.")
            return "\n\n".join(context)
    except Exception as e:
        print(f"  -> Search failed or timed out: {e}")
        return "No search results available."

def clean_words(s):
    if not s:
        return []
    s = s.replace('“', '"').replace('”', '"').replace('’', "'").replace('‘', "'")
    s = s.replace('—', ' ').replace('–', ' ').replace('-', ' ')
    return re.sub(r'[^\w\s]', '', s.lower()).split()

def verify_quotes():
    # Make sure to run this script from the project root
    quote_files = glob.glob("src/data/quotes/*.json")

    # Sort files in natural numerical order (q1, q2... q4248) so progress is deterministic
    def get_sort_key(path):
        base = os.path.splitext(os.path.basename(path))[0]
        if base.startswith("q") and base[1:].isdigit():
            return (0, int(base[1:]))
        return (1, base)

    quote_files.sort(key=get_sort_key)
    print(f"Found {len(quote_files)} quotes to process.")

    # Initialize client once and reuse connection pool across all quotes
    client = ollama.Client(host='http://localhost:11434', timeout=httpx.Timeout(60.0))

    for filepath in quote_files:
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)

            # Skip if already processed, unless sourcedFrom is a search engine link
            if "isParaphrased" in data and "sourcedFrom" in data:
                url = data.get("sourcedFrom", "").lower()
                if "google.com/search" in url or "duckduckgo.com" in url or "bing.com/search" in url:
                    print(f"Re-processing {filepath} because sourcedFrom is a search engine URL.")
                else:
                    continue

            quote = data.get("content", "")
            author = data.get("author", "")
            sourceWork = data.get("sourceWork", "")

            print(f"Verifying: {filepath} | {author}...")
            
            # 1. Get search context
            search_context = search_for_quote(quote, author)

            # 2. Prepare prompt
            prompt = f"""
            Analyze the following quote attributed to {author}, from the work: {sourceWork}.
            Quote: "{quote}"

            Here are some web search results to help you determine the origin:
            {search_context}

            Determine if this exact phrasing is authentic, or if it is a modern paraphrase/hallucination.
            Provide the authentic verbatim text from the original translation in originalQuote.
            
            IMPORTANT: The source URL (sourcedFrom) MUST be a direct link to the authoritative source text (e.g., Project Gutenberg, a university archive). It MUST NOT be a search engine results page (e.g., Google, Bing, DuckDuckGo).
            """

            # 3. Call local LLM (Ollama)
            print("  -> Requesting analysis from local LLM (timeout: 60s)...")
            response = client.chat(
                model='llama3.1',
                messages=[
                    {"role": "user", "content": prompt}
                ],
                format=QuoteVerificationResult.model_json_schema(),
                options={"temperature": 0.0}
            )
            
            print("  -> Received LLM analysis.")
            
            # 4. Parse result
            result = QuoteVerificationResult.model_validate_json(response['message']['content'])

            # Update the JSON data
            if result.sourcedFrom:
                data["sourcedFrom"] = result.sourcedFrom
            
            orig_quote = result.originalQuote or ""
            if orig_quote:
                data["originalQuote"] = orig_quote

            # Programmatic normalization: If words match verbatim, force isParaphrased = False
            words_c = clean_words(quote)
            words_o = clean_words(orig_quote)
            if words_c and words_o and words_c == words_o:
                data["isParaphrased"] = False
            elif result.isParaphrased is not None:
                data["isParaphrased"] = result.isParaphrased

            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
                f.write("\n") # Add trailing newline
            
            print(f"Updated {filepath}: isParaphrased={data.get('isParaphrased')}")
            
            # Small sleep to avoid hammering DuckDuckGo search
            time.sleep(2)

        except Exception as e:
            print(f"Error processing {filepath}: {e}")
            time.sleep(2)

if __name__ == "__main__":
    verify_quotes()

