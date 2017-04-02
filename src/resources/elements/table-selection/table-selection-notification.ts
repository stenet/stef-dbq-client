export interface ITableSelectionNotification {
  onTableClicked?(databaseId: number, tableName: string, alias?: string);
}