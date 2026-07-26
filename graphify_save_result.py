import json
import uuid
from pathlib import Path

question = "What connects Feature 01: Landing Page & Brand Experience, Feature 03: Product Details & Customization, Feature 04: Inspiration Board to the rest of the system?"
answer = "Expanded from original query via vocab: [feature, landing, page, brand, experience, product, details, customization, inspiration, board, system]. Then traversed... Feature 01 connects to Feature 02 (Gallery & Discovery). Feature 04 connects to Feature 05 (Custom Order Builder), which then links to the Order Timeline and Notifications features. Feature 03 remains isolated."
nodes = ["Feature 01: Landing Page & Brand Experience", "Feature 03: Product Details & Customization", "Feature 04: Inspiration Board", "Feature 02: Gallery & Discovery", "Feature 05: Custom Order Builder"]

out_dir = Path("graphify-out/reflections")
out_dir.mkdir(parents=True, exist_ok=True)
res_file = out_dir / f"result_{uuid.uuid4().hex[:8]}.json"

data = {
    "question": question,
    "answer": answer,
    "type": "query",
    "nodes": nodes,
    "outcome": "useful"
}
res_file.write_text(json.dumps(data, indent=2), encoding="utf-8")
