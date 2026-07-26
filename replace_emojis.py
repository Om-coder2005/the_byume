import os
import re

emoji_map = {
    "??": "<iconify-icon icon=\"lucide:bar-chart-2\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:inbox\"></iconify-icon>",
    "???": "<iconify-icon icon=\"lucide:image\"></iconify-icon>",
    "?": "<iconify-icon icon=\"lucide:star\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:file-text\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:sparkles\"></iconify-icon>",
    "???": "<iconify-icon icon=\"lucide:eye\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:eye-off\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:frown\"></iconify-icon>",
    "??": "<iconify-icon icon=\"mdi:yarn\"></iconify-icon>",
    "??": "<iconify-icon icon=\"mdi:teddy-bear\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:package\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:banknote\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:scissors\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:sun\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:help-circle\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:camera\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:save\"></iconify-icon>",
    "?": "<iconify-icon icon=\"lucide:check-circle\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:pen-tool\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:receipt\"></iconify-icon>",
    "??": "<iconify-icon icon=\"mdi:needle\"></iconify-icon>",
    "?": "<iconify-icon icon=\"lucide:coffee\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:folder-open\"></iconify-icon>",
    "???": "<iconify-icon icon=\"lucide:key\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:unlock\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:map-pin\"></iconify-icon>",
    "?": "<iconify-icon icon=\"lucide:sparkles\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:pin\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:gift\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:flower\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:cat\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:home\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:book-open\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:mail\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:search\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:award\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:heart\"></iconify-icon>",
    "?": "<iconify-icon icon=\"lucide:help-circle\"></iconify-icon>",
    "?": "<iconify-icon icon=\"lucide:heart\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:gift\"></iconify-icon>",
    "??": "<iconify-icon icon=\"lucide:message-circle\"></iconify-icon>",
    "?": "<iconify-icon icon=\"lucide:hourglass\"></iconify-icon>"
}

def replace_emojis(text):
    for emoji, icon in emoji_map.items():
        text = text.replace(emoji, icon)
    return text

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".tsx") or file.endswith(".ts"):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                new_content = replace_emojis(content)
                if new_content != content:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Updated {path}")

process_directory("apps")

