import os
import sys
import subprocess
from urllib.parse import urlparse
from pathlib import Path

def test_tidb_database_connection():
    try:
        import pymysql
    except ImportError:
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "pymysql"])
            import pymysql
        except Exception as e:
            print(f"Failed to install pymysql: {e}")
            return

    env_path = Path('.') / '.env'
    if not env_path.is_file():
        print(".env file not found in project root.")
        return

    database_url = None
    try:
        with env_path.open('r') as f:
            for line in f:
                line = line.strip()
                if line.startswith("DATABASE_URL="):
                    database_url = line.split("DATABASE_URL=", 1)[1].strip().strip('"').strip("'")
                    break
    except Exception as e:
        print(f"Error reading .env file: {e}")
        return

    if not database_url:
        print("DATABASE_URL not found in .env file.")
        return

    try:
        parsed = urlparse(database_url)
        if parsed.scheme != 'mysql':
            print(f"Unsupported scheme in DATABASE_URL: {parsed.scheme}")
            return

        user = parsed.username
        password = parsed.password
        host = parsed.hostname
        port = parsed.port or 3306
        database = parsed.path.lstrip('/')

        connection = pymysql.connect(
            host=host,
            user=user,
            password=password,
            database=database,
            port=port,
            connect_timeout=30,
            read_timeout=30,
            write_timeout=30
        )

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1;")
                result = cursor.fetchone()
                assert result is not None, "Query returned no results"
            print("TiDB Connection Successful")
        finally:
            connection.close()

    except Exception as e:
        print(str(e))

test_tidb_database_connection()