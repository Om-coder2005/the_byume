import os
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

def test_full_flow():
    # 1. Register a user
    email = f"test_{os.urandom(4).hex()}@example.com"
    response = client.post("/api/auth/register", json={
        "email": email,
        "username": f"user_{os.urandom(4).hex()}",
        "password": "strongpassword123"
    })
    assert response.status_code == 200
    user = response.json()
    
    # 2. Login
    response = client.post("/api/auth/login", data={
        "username": email,
        "password": "strongpassword123"
    })
    assert response.status_code == 200
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 3. Create an order
    response = client.post("/api/orders/", json={
        "budget": "$50-$100",
        "notes": "I would like a custom crochet sunflower."
    }, headers=headers)
    assert response.status_code == 200
    order = response.json()
    assert order["uuid"] is not None
    print(f"Success! Order Created: {order['order_number']}")

if __name__ == "__main__":
    test_full_flow()
