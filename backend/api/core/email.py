import smtplib
from email.message import EmailMessage
from api.core.config import settings

def send_email(email_to: str, subject: str, html_content: str) -> bool:
    """
    Sends an email using the configured SMTP server.
    Returns True if successful, False otherwise.
    """
    if not settings.SMTP_HOST:
        print(f"[MOCK EMAIL] To: {email_to} | Subject: {subject}")
        print(f"Content: {html_content}")
        return False
        
    try:
        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = f"{settings.EMAILS_FROM_NAME} <{settings.EMAILS_FROM_EMAIL}>"
        msg['To'] = email_to
        msg.set_content("Please enable HTML to view this email.")
        msg.add_alternative(html_content, subtype='html')
        
        # Connect to server
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
        server.starttls()
        if settings.SMTP_USER and settings.SMTP_PASSWORD:
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Failed to send email to {email_to}: {str(e)}")
        return False

def send_order_status_email(email_to: str, order_number: str, new_status: str, customer_name: str = "Customer"):
    """
    Sends an order status update email to a customer.
    """
    subject = f"Order Update: Your Byume order {order_number} is now {new_status}"
    
    html_content = f"""
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #d15656;">Byume Studio</h2>
        <p>Hi {customer_name},</p>
        <p>Great news! The status of your custom order <strong>{order_number}</strong> has been updated to:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; font-size: 18px; text-align: center; font-weight: bold; color: #d15656;">
          {new_status}
        </div>
        <p>Log in to your Customer Dashboard at any time to view the timeline and track progress.</p>
        <br/>
        <p>Best regards,<br/>The Byume Team</p>
      </body>
    </html>
    """
    
    return send_email(email_to=email_to, subject=subject, html_content=html_content)
