import {IColumnInfo} from "./column-info";

export interface ITableData {
  tableId: number;

  databaseId?: number;
  tableName?: string;
  script?: string;
  columns?: IColumnInfo[];
  rows?: number;
  alias?: string;
  tables?: string;
  data?: any[];
  changeData?: any[];
  referencedTableData?: ITableData;
  referencedTableDataId?: number;
}