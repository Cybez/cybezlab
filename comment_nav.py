import os
import re

directory = r"d:\Cybez Lab"

# Patterns targeting the outer <li> incorporating submenus for Services, Projects, and Blog.
pattern_services = r'(?s)(<li>\s*<a href="service-details\.html">.*?Services.*?\s*</ul>\s*</li>)'
pattern_projects = r'(?s)(<li>\s*<a href="project-details\.html">.*?Projects.*?\s*</ul>\s*</li>)'
pattern_blog = r'(?s)(<li>\s*<a href="news-details\.html">.*?Blog.*?\s*</ul>\s*</li>)'

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    changed = False
    
    def comment_match(match):
        text = match.group(0)
        if text.strip().startswith('<!--'):
            return text # Already commented
        return f"<!--\n{text}\n-->"

    if re.search(pattern_services, content):
        content = re.sub(pattern_services, comment_match, content)
        changed = True

    if re.search(pattern_projects, content):
        content = re.sub(pattern_projects, comment_match, content)
        changed = True

    if re.search(pattern_blog, content):
        content = re.sub(pattern_blog, comment_match, content)
        changed = True

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        process_file(os.path.join(directory, filename))
print("Finished commenting navbar items.")
