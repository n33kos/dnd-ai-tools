import "reflect-metadata"
import { DataSource } from "typeorm"
import Actor from "./entities/Actor";
import Campaign from "./entities/Campaign"
import Conversation from "./entities/Conversation";
import Location from "./entities/Location";
import Message from "./entities/Message";

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
          Actor,
          Campaign,
          Conversation,
          Location,
          Message,
        ],
        migrations: [],
        subscribers: [],
      });

      await SqliteDataSource.dataSource.initialize();
    }

    return SqliteDataSource.dataSource
  }
}
