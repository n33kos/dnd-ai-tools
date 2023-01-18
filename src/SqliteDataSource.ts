import "reflect-metadata"
import { DataSource } from "typeorm"
import Actor from "./entities/Actor";
import Campaign from "./entities/Campaign"
import Conversation from "./entities/Conversation";
import Item from "./entities/Item";
import Location from "./entities/Location";
import Message from "./entities/Message";
import { InitialTableCreation1673891728991 } from "./migrations/1673891728991-InitialTableCreation";

export default class SqliteDataSource {
  private static dataSource: DataSource;

  public static async getInstance(): Promise<DataSource> {
    if (!SqliteDataSource.dataSource) {
      SqliteDataSource.dataSource = new DataSource({
        type: "sqlite",
        database: "dnd-ai-tools.sqlite",
        logging: true,
        entities: [
          Actor,
          Campaign,
          Conversation,
          Location,
          Message,
          Item,
        ],
        migrations: [InitialTableCreation1673891728991],
        migrationsRun: true,
        subscribers: [],
      });

      await SqliteDataSource.dataSource.initialize();
    }

    return SqliteDataSource.dataSource
  }
}
