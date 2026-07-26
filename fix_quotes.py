import os
import re

def fix_quoted_icons(directory):
    # Regex to capture <iconify-icon ...></iconify-icon> inside double or single quotes
    pattern1 = re.compile(r'\"(<iconify-icon icon=[^\>]+></iconify-icon>)\"')
    pattern2 = re.compile(r'\'(<iconify-icon icon=[^\>]+></iconify-icon>)\'')
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = pattern1.sub(r'\1', content)
                new_content = pattern2.sub(r'\1', new_content)
                
                # Also fix the SpiralSidebar types and any other types
                new_content = new_content.replace('icon: string;', 'icon: React.ReactNode;')
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f'Fixed {path}')

fix_quoted_icons('apps')
