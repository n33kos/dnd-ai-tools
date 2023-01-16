import "reflect-metadata";
import { DataSource } from "typeorm";

export default class SqliteDataSource {
  private static dataSource: DataSource;

  public static async getInstance(): Promise<DataSource> {
    if (!SqliteDataSource.dataSource) {
      SqliteDataSource.dataSource = new DataSource({
        type: "sqlite",
        database: "dnd-ai-tools.sqlite",
        synchronize: true,
        logging: true,
        entities: ["entities/*.ts"],
        migrations: [],
        subscribers: [],
      });

      await SqliteDataSource.dataSource.initialize();
    }

    return SqliteDataSource.dataSource
  }
}
