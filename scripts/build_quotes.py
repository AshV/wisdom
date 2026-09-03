import json
import os
import re
import unicodedata

from quotes_philosophy import PHILOSOPHY_QUOTES
from quotes_wisdom import WISDOM_QUOTES
from quotes_resilience_courage import RESILIENCE_COURAGE_QUOTES
from quotes_nature_mindfulness import NATURE_MINDFULNESS_QUOTES
from quotes_creativity_science import CREATIVITY_SCIENCE_QUOTES
from quotes_love_leadership import LOVE_LEADERSHIP_QUOTES
from quotes_additional import ADDITIONAL_QUOTES
from quotes_modern_masters import MODERN_MASTERS_QUOTES

VALID_MOODS = {
    'reflective',
    'motivational',
    'serene',
    'bold',
    'melancholic',
    'joyful',
    'philosophical',
    'romantic',
}

def slugify(text):
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = text.lower()
    text = re.sub(r"['’]", "", text)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")

def normalize_for_dedupe(text):
    return re.sub(r'[^a-z0-9]', '', text.lower())

def calc_duration(text):
    words = len(text.split())
    # 2.5 to 3 words per second reading pace, bounded between 6s and 12s
    return max(6, min(12, round(words / 2.5)))

def main():
    # 1. Load existing quotes
    existing_path = 'scripts/existing-quotes.json'
    with open(existing_path, 'r', encoding='utf-8') as f:
        existing_quotes = json.load(f)

    print(f"Loaded {len(existing_quotes)} existing original quotes.")

    # 2. Combine all quotes
    incoming_lists = [
        PHILOSOPHY_QUOTES,
        WISDOM_QUOTES,
        RESILIENCE_COURAGE_QUOTES,
        NATURE_MINDFULNESS_QUOTES,
        CREATIVITY_SCIENCE_QUOTES,
        LOVE_LEADERSHIP_QUOTES,
        ADDITIONAL_QUOTES,
        MODERN_MASTERS_QUOTES,
    ]

    seen_contents = set()
    final_quotes = []

    # Preserve the first 24 existing quotes exactly
    for q in existing_quotes:
        key = normalize_for_dedupe(q['content'])
        seen_contents.add(key)
        final_quotes.append(q)

    # Append new unique quotes
    for q_list in incoming_lists:
        for q in q_list:
            key = normalize_for_dedupe(q['content'])
            if key not in seen_contents:
                seen_contents.add(key)
                final_quotes.append(q)
            if len(final_quotes) == 500:
                break
        if len(final_quotes) == 500:
            break

    print(f"Total unique quotes assembled: {len(final_quotes)}")
    assert len(final_quotes) == 500, f"Expected 500 quotes, got {len(final_quotes)}"

    # 3. Format, validate, and write quotes
    output_dir = 'src/data/quotes'
    os.makedirs(output_dir, exist_ok=True)

    authors = set()
    categories = set()
    moods = set()
    tags = set()

    for idx, q in enumerate(final_quotes, start=1):
        quote_id = f"q{str(idx).zfill(3)}"
        content = q['content'].strip()
        author = q['author'].strip()
        author_slug = q.get('authorSlug') or slugify(author)
        category = q['category'].strip()
        category_slug = q.get('categorySlug') or slugify(category)
        mood = q['mood']

        assert mood in VALID_MOODS, f"Invalid mood '{mood}' in quote {quote_id} by {author}"

        quote_tags = [slugify(t) for t in q.get('tags', [category_slug])]
        if not quote_tags:
            quote_tags = [category_slug]

        theme = q.get('theme', 'dark')
        duration = q.get('duration') or calc_duration(content)

        formatted_quote = {
            "id": quote_id,
            "content": content,
            "author": author,
            "authorSlug": author_slug,
            "category": category,
            "categorySlug": category_slug,
            "mood": mood,
            "tags": quote_tags,
            "theme": theme,
            "duration": duration,
        }

        authors.add(author)
        categories.add(category)
        moods.add(mood)
        tags.update(quote_tags)

        file_path = os.path.join(output_dir, f"{quote_id}.json")
        with open(file_path, 'w', encoding='utf-8') as out_file:
            json.dump(formatted_quote, out_file, indent=2, ensure_ascii=False)
            out_file.write("\n")

    print("\n=== GENERATION SUMMARY ===")
    print(f"Total quotes written: 500 (q001.json to q500.json)")
    print(f"Unique authors: {len(authors)}")
    print(f"Categories ({len(categories)}): {', '.join(sorted(categories))}")
    print(f"Moods ({len(moods)}): {', '.join(sorted(moods))}")
    print(f"Unique tags: {len(tags)}")

if __name__ == '__main__':
    main()
