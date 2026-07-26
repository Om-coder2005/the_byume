import sys, json
from graphify.export import to_html
from networkx.readwrite import json_graph
import networkx as nx
from pathlib import Path

data = json.loads(Path('graphify-out/graph.json').read_text(encoding='utf-8-sig'))
G = json_graph.node_link_graph(data, edges='links')
analysis = json.loads(Path('graphify-out/.graphify_analysis.json').read_text(encoding='utf-8-sig'))
labels_data = json.loads(Path('graphify-out/.graphify_labels.json').read_text(encoding='utf-8-sig'))

communities = {int(k): v for k, v in analysis['communities'].items()}
labels = {int(k): v for k, v in labels_data.items()}

to_html(G, communities, 'graphify-out/graph.html', community_labels=labels)
