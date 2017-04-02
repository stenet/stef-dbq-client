import { autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { RestService } from "../../framework/base/services/export";
import * as Models from "../models/export";
import * as EAConstants from "../event-aggregator-constants";

@autoinject
export class DatabaseService {
  private _tables: any;

  constructor(
    private rest: RestService,
    private eventAggregator: EventAggregator
  ) {
    this.getDatabases();
    this._tables = {};
  }

  databases: Models.IDatabaseRepository[];

  getDatabases(): Promise<Models.IDatabaseRepository[]> {
    if (this.databases) {
      return Promise.resolve(this.databases);
    }

    return this
      .get("Database/Databases")
      .then(r => {
        this.databases = r;
        return r;
      });
  }
  getTables(databaseId: number): Promise<Models.ITable[]> {
    if (this._tables[databaseId]) {
      return Promise.resolve(this._tables[databaseId]);
    }

    return this
      .get(`Database/Tables?databaseId=${databaseId}`)
      .then(r => {
        this._tables[databaseId] = r;
        return r;
      });
  }
  deleteDatabase(database: Models.IDatabaseRepository): Promise<any> {
    const index = this.databases.indexOf(database);
    if (index >= 0) {
      this.databases.splice(index, 1);
    }

    if (!database.id) {
      return Promise.resolve();
    }

    this.eventAggregator.publish(EAConstants.DATABASE_REMOVED, database.id);
    
    return this.post("Database/DeleteDatabase", {
      id: database.id
    });
  }
  postDatabase(database: Models.IDatabaseRepository): Promise<Models.IDatabaseRepository> {
    return this.post("Database/Database", database)
      .then(r => {
        Object.assign(database, r);
      });
  }
  reload(): Promise<Models.IDatabaseRepository[]> {
    this.databases = null;

    return this.getDatabases();
  }

  getProviders(): Promise<Models.IDatabaseProvider[]> {
    return this
      .get("Database/Providers")
      .then(r => {
        return r;
      });
  }

  private get(url: string): Promise<any> {
    return this.rest
      .get({
        url: this.rest.getApiUrl(url)
      });
  }
  private post(url: string, data: any): Promise<any> {
    return this.rest
      .post({
        url: this.rest.getApiUrl(url),
        data: data
      });
  }
}