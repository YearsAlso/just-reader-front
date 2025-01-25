import Database from "@tauri-apps/plugin-sql";

class DefaultDbConnector {
    private db: Database | null = null;
    async getDB() {
        if (!this.db) {
            this.db = await Database.load("sqlite:just-reader.db").then(db => db);
        }
        return this.db;
    }
}

const defaultDbConnector = new DefaultDbConnector();

export default defaultDbConnector;