import {Table} from "./table";

export interface ITableNotification {
  onRelationClicked(databaseId: number, tableName: string, columnName: string, value: any);
  onDispose(table: Table);
}