export default [
  {
    "statements": [
      "CREATE TABLE \"items\" (\n  \"id\" TEXT NOT NULL,\n  \"content\" TEXT NOT NULL,\n  \"content_text_null\" TEXT,\n  \"content_text_null_default\" TEXT DEFAULT (CAST('' AS TEXT)),\n  \"intvalue_null\" INTEGER,\n  \"intvalue_null_default\" INTEGER DEFAULT 10,\n  CONSTRAINT \"items_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "\n    -- Toggles for turning the triggers on and off\n    INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.items', 1);\n    ",
      "\n    /* Triggers for table items */\n  \n    -- ensures primary key is immutable\n    DROP TRIGGER IF EXISTS update_ensure_main_items_primarykey;\n    ",
      "\n    CREATE TRIGGER update_ensure_main_items_primarykey\n      BEFORE UPDATE ON main.items\n    BEGIN\n      SELECT\n        CASE\n          WHEN old.id != new.id THEN\n\t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n        END;\n    END;\n    ",
      "\n    -- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\n    DROP TRIGGER IF EXISTS insert_main_items_into_oplog;\n    ",
      "\n    CREATE TRIGGER insert_main_items_into_oplog\n       AFTER INSERT ON main.items\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'items', 'INSERT', json_object('id', new.id), json_object('id', new.id, 'content', new.content, 'content_text_null', new.content_text_null, 'content_text_null_default', new.content_text_null_default, 'intvalue_null', new.intvalue_null, 'intvalue_null_default', new.intvalue_null_default), NULL, NULL);\n    END;\n    ",
      "\n    DROP TRIGGER IF EXISTS update_main_items_into_oplog;\n    ",
      "\n    CREATE TRIGGER update_main_items_into_oplog\n       AFTER UPDATE ON main.items\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'items', 'UPDATE', json_object('id', new.id), json_object('id', new.id, 'content', new.content, 'content_text_null', new.content_text_null, 'content_text_null_default', new.content_text_null_default, 'intvalue_null', new.intvalue_null, 'intvalue_null_default', new.intvalue_null_default), json_object('id', old.id, 'content', old.content, 'content_text_null', old.content_text_null, 'content_text_null_default', old.content_text_null_default, 'intvalue_null', old.intvalue_null, 'intvalue_null_default', old.intvalue_null_default), NULL);\n    END;\n    ",
      "\n    DROP TRIGGER IF EXISTS delete_main_items_into_oplog;\n    ",
      "\n    CREATE TRIGGER delete_main_items_into_oplog\n       AFTER DELETE ON main.items\n       WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\n    BEGIN\n      INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n      VALUES ('main', 'items', 'DELETE', json_object('id', old.id), NULL, json_object('id', old.id, 'content', old.content, 'content_text_null', old.content_text_null, 'content_text_null_default', old.content_text_null_default, 'intvalue_null', old.intvalue_null, 'intvalue_null_default', old.intvalue_null_default), NULL);\n    END;\n    "
    ],
    "version": "20230720131848_679"
  }
]