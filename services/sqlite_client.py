"""Local SQLite connections and additive schema initialization."""
from contextlib import contextmanager
from pathlib import Path
import sqlite3

from config import settings


@contextmanager
def connection(database_path, *, write=False):
    # Each operation owns its connection; no connection crosses thread boundaries.
    db = sqlite3.connect(str(database_path), timeout=10)
    db.row_factory = sqlite3.Row
    try:
        db.execute("PRAGMA foreign_keys = ON")
        if write:
            db.execute("BEGIN IMMEDIATE")
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


def initialize_database(database_path=None):
    path = Path(database_path if database_path is not None else settings.SQLITE_DATABASE_PATH)
    path.parent.mkdir(parents=True, exist_ok=True)
    # CREATE IF NOT EXISTS preserves existing tables and records. An incompatible
    # pre-existing schema fails visibly on use; it is never reset automatically.
    statements = (
        """CREATE TABLE IF NOT EXISTS products (
            product_id TEXT PRIMARY KEY,
            product_identity_key TEXT NOT NULL UNIQUE,
            product_name TEXT NOT NULL,
            retailer TEXT NOT NULL,
            product_url TEXT NOT NULL,
            product_image TEXT,
            current_price REAL,
            original_price REAL,
            currency TEXT NOT NULL,
            first_seen TEXT NOT NULL,
            last_checked TEXT NOT NULL,
            price_status TEXT NOT NULL,
            product_data TEXT NOT NULL
        )""",
        """CREATE TABLE IF NOT EXISTS price_history (
            product_id TEXT NOT NULL REFERENCES products(product_id),
            search_id TEXT NOT NULL,
            price REAL NOT NULL,
            currency TEXT NOT NULL,
            recorded_at TEXT NOT NULL,
            change_type TEXT NOT NULL,
            PRIMARY KEY (product_id, search_id)
        )""",
        """CREATE TABLE IF NOT EXISTS searches (
            search_id TEXT PRIMARY KEY,
            data TEXT NOT NULL
        )""",
    )
    with connection(path, write=True) as db:
        for statement in statements:
            db.execute(statement)
    return path
