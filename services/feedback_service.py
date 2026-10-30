import smtplib
from email.message import EmailMessage

from config.settings import (
    MAIL_SERVER,
    MAIL_PORT,
    MAIL_USERNAME,
    MAIL_PASSWORD,
    FEEDBACK_RECIPIENT,
    MAIL_TIMEOUT,
)


def send_feedback_email(feedback):
    """
    Send tester feedback to the project owner's email address.

    The tester's email is used as Reply-To, not From.
    """

    # Ensure all required SMTP settings are available.
    if not all([
        MAIL_USERNAME,
        MAIL_PASSWORD,
        FEEDBACK_RECIPIENT,
    ]):
        raise RuntimeError("Email configuration is incomplete.")

    # Create the email message.
    email = EmailMessage()

    email["Subject"] = f"Website Feedback: {feedback['subject']}"
    email["From"] = MAIL_USERNAME
    email["To"] = FEEDBACK_RECIPIENT

    # Allow the project owner to reply directly to the tester.
    email["Reply-To"] = feedback["email"]

    # Build the feedback email body.
    email.set_content(
        f"""
New website feedback received.

Tester Name: {feedback['name']}
Tester Email: {feedback['email']}

Category: {feedback['category']}
Rating: {feedback['rating'] or 'Not provided'}
Page / Feature: {feedback['feature'] or 'Not specified'}

Subject: {feedback['subject']}

Feedback Message:
{feedback['message']}
"""
    )

    # Connect to Gmail using secure STARTTLS.
    with smtplib.SMTP(
        MAIL_SERVER,
        MAIL_PORT,
        timeout=MAIL_TIMEOUT,
    ) as server:

        server.ehlo()
        server.starttls()
        server.ehlo()

        # Authenticate with the sender Gmail account.
        server.login(MAIL_USERNAME, MAIL_PASSWORD)

        # Send the email.
        server.send_message(email)