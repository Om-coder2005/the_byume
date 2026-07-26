import json
import os
from pathlib import Path
from graphify.llm import extract_corpus_parallel

detect = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding="utf-8-sig"))
all_files = [f for cat in ('document', 'paper', 'image') for f in detect['files'].get(cat, [])]

if all_files:
    # Use graphify-out/.graphify_cached.json for caching if we want to be perfectly aligned with the spec,
    # but the instruction said to just use `extract_corpus_parallel`. 
    # extract_corpus_parallel handles its own caching usually if prompt_file is provided.
    # To keep it simple per the SKILL.md: "use graphify.llm.extract_corpus_parallel(files, backend='gemini') for semantic extraction instead of dispatching subagents."
    result = extract_corpus_parallel(all_files, backend="gemini")
    Path('graphify-out/.graphify_semantic.json').write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f'Semantic: {len(result.get("nodes", []))} nodes, {len(result.get("edges", []))} edges')
else:
    Path('graphify-out/.graphify_semantic.json').write_text(json.dumps({'nodes':[],'edges':[],'hyperedges':[],'input_tokens':0,'output_tokens':0}), encoding='utf-8')
    print('No docs/papers/images - skipping semantic extraction')
