def get_token(client):
    response = client.post(
        "/api/auth/register",
        json={"email": "orderuser@example.com", "username": "orderuser", "password": "password123"}
    )
    if response.status_code == 400: # Already exists
        pass
    login_response = client.post(
        "/api/auth/login",
        data={"username": "orderuser@example.com", "password": "password123"}
    )
    return login_response.json()["access_token"]

def test_create_order(client):
    token = get_token(client)
    
    response = client.post(
        "/api/orders/",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "budget": "$50 - $100",
            "deadline": "2026-12-25",
            "gift_message": "Happy Birthday",
            "priority": "normal",
            "notes": "I would like a custom keychain."
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "BYUME" in data["order_number"]
    assert data["notes"] == "I would like a custom keychain."
    assert data["status"]["name"] == "Submitted"

def test_read_orders(client):
    token = get_token(client)
    response = client.get(
        "/api/orders/",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert len(response.json()) > 0
