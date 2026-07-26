import sys
from api.core.email import send_order_status_email

def main():
    print("Testing email...")
    success = send_order_status_email("customer@example.com", "BYUME-TEST", "Testing")
    print(f"Success: {success}")

if __name__ == "__main__":
    main()
