import pytest

def get_admin_token(client):
    # Register an admin user
    client.post(
        "/api/auth/register",
        json={"email": "admin@test.com", "username": "adminuser", "password": "password123"}
    )
    
    # We must explicitly make them admin directly in DB, but since we don't have db fixture here,
    # let's assume the first registered user in sqlite isn't admin unless we patch it.
    # For now, let's just test the public routes which don't require admin.
    pass

def test_read_galleries_empty(client):
    response = client.get("/api/gallery/")
    assert response.status_code == 200
    assert response.json() == []

def test_read_categories(client):
    response = client.get("/api/gallery/categories")
    assert response.status_code == 200
    assert type(response.json()) == list
