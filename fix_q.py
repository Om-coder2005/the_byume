import os

def fix_question_marks(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace the incorrectly inserted hourglass tag back to a question mark
                target = '<iconify-icon icon="lucide:hourglass"></iconify-icon>'
                if target in content:
                    new_content = content.replace(target, '?')
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f'Fixed {path}')

fix_question_marks('apps')
