import "reflect-metadata"
import { DataSource } from "typeorm"
import Campaign from "./entities/Campaign"

export default class SqliteDataSource {
  private static dataSource: DataSource;

  public static async getInstance(): Promise<DataSource> {
    if (!SqliteDataSource.dataSource) {
      SqliteDataSource.dataSource = new DataSource({
        type: "sqlite",
        database: "database.sqlite",
        synchronize: true,
        logging: false,
        entities: [
          Campaign,
        ],
        migrations: [],
        subscribers: [],
      });

      await SqliteDataSource.dataSource.initialize();
    }

    return SqliteDataSource.dataSource
  }
}
