import os
import pymysql
from dotenv import load_dotenv

def test_validate_database_schema_permissions():
    load_dotenv()
    database_url = os.getenv("DATABASE_URL")
    assert database_url, "DATABASE_URL not set in .env file"

    # Parse the DATABASE_URL assuming format: mysql+pymysql://user:password@host:port/dbname?params
    # Remove the prefix if present
    url = database_url
    if url.startswith("mysql+pymysql://"):
        url = url[len("mysql+pymysql://"):]
    elif url.startswith("mysql://"):
        url = url[len("mysql://"):]

    # Split user:password@host:port/dbname
    user_pass, rest = url.split("@", 1)
    user, password = user_pass.split(":", 1)
    # rest: host:port/dbname?params
    if "/" in rest:
        host_port, db_and_more = rest.split("/", 1)
    else:
        host_port = rest
        db_and_more = ""
    if ":" in host_port:
        host, port_str = host_port.split(":", 1)
        port = int(port_str)
    else:
        host = host_port
        port = 3306

    # Extract database name, ignore parameters after '?'
    if "?" in db_and_more:
        db_name = db_and_more.split("?",1)[0]
    else:
        db_name = db_and_more

    conn = None
    try:
        conn = pymysql.connect(
            host=host,
            user=user,
            password=password,
            port=port,
            database=db_name,
            cursorclass=pymysql.cursors.DictCursor,
            connect_timeout=30,
        )
        with conn.cursor() as cursor:
            # 2. Execute 'SELECT DATABASE();' and print the result.
            cursor.execute("SELECT DATABASE();")
            current_db = cursor.fetchone()
            current_db_name = current_db.get("DATABASE()") if current_db else None
            print(f"Current database: {current_db_name}")

            # 3. Execute 'SHOW TABLES;' and print the list of tables.
            cursor.execute("SHOW TABLES;")
            tables_result = cursor.fetchall()
            tables = []
            for row in tables_result:
                # The keys can vary like 'Tables_in_<dbname>'
                tables.extend(row.values())
            print(f"Tables in database '{current_db_name}': {tables}")

            # 4. Check if 'TourRequest' in list
            if "TourRequest" in tables:
                print("Table found in database")
                table_found = True
                table_db = current_db_name
            else:
                print("Table NOT found in current database")
                cursor.execute(
                    'SELECT table_schema FROM information_schema.tables WHERE table_name = "TourRequest";'
                )
                schema_result = cursor.fetchone()
                if schema_result:
                    table_db = schema_result.get("table_schema")
                    print(f"Table 'TourRequest' found in database schema: {table_db}")
                    table_found = True
                else:
                    print("Table 'TourRequest' does not exist in the entire server")
                    table_found = False

            # 5. if table exists, try insert dummy record in transaction with rollback
            if table_found:
                try:
                    conn.begin()
                    insert_sql = (
                        "INSERT INTO `TourRequest` "
                        "(name, companyName, phone, email, personCount, locationPreference, tourDate) "
                        "VALUES (%s, %s, %s, %s, %s, %s, NOW())"
                    )
                    cursor.execute(
                        insert_sql,
                        ("Test", "TestCo", "000", "test@test.com", "1", "Test"),
                    )
                    # Do not commit, rollback after
                    print("Insert test succeeded")
                except Exception as e:
                    print(f"Insert test failed: {e}")
                finally:
                    conn.rollback()
            else:
                print("Skipping insert test because table does not exist.")

    except Exception as e:
        raise AssertionError(f"Error during database schema validation: {e}")
    finally:
        if conn:
            conn.close()

test_validate_database_schema_permissions()