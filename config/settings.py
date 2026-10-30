import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from the local .env file.
# On Render, environment variables are configured in the dashboard.
load_dotenv()


# Gmail SMTP configuration.
MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
MAIL_PORT = int(os.getenv("MAIL_PORT", "587"))

# Gmail account used to send feedback emails.
MAIL_USERNAME = os.getenv("MAIL_USERNAME")

# Gmail App Password, not your normal Gmail password.
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

# Your personal Gmail address where feedback will be received.
FEEDBACK_RECIPIENT = os.getenv("FEEDBACK_RECIPIENT")

# SMTP connection timeout in seconds.
MAIL_TIMEOUT = 15

# One local database. Relative paths are resolved against the project root.
PROJECT_ROOT = Path(__file__).resolve().parents[1]
_database_path = Path(os.getenv("SQLITE_DATABASE_PATH", "data/products.sqlite3")).expanduser()
SQLITE_DATABASE_PATH = (_database_path if _database_path.is_absolute()
                        else PROJECT_ROOT / _database_path).resolve()
