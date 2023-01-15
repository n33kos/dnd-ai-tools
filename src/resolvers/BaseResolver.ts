import SqliteDataSource from "../SqliteDataSource";

export default class BaseResolver {
  private _entityManager;

  async getEntityManager() {
    if (!this._entityManager) {
      const dataSource = await SqliteDataSource.getInstance();
      this._entityManager = dataSource.manager;
    }

    return this._entityManager;
  }
}
