import os

directories = ['apps/web/src/app', 'apps/admin/src/app']

for d in directories:
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith('.tsx'):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                # Revert ₹{ to ${
                content = content.replace('₹{', '${')
                
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(content)
print('Fixed template literals!')
