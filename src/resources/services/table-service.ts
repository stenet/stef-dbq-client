import { autoinject } from "aurelia-framework";
import { Table } from "../elements/table/table";
import * as Models from "../models/export";

@autoinject
export class TableService {
  constructor() {
    this.tables = [];
  }

  tables: Table[];

  getTableDataByTableId(tableId: number): Models.ITableData {
    const table = this.tables.find(c => c.tableData.tableId == tableId);

    if (table) {
      return table.tableData;
    } else {
      return null;
    }
  }

  registerTable(table: Table) {
    this.tables.push(table);
  }
  deregisterTable(table: Table) {
    const index = this.tables.indexOf(table);
    if (index < 0) {
      return;
    }

    this.tables.splice(index, 1);
  }
}