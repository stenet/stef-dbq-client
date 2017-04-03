import { autoinject, bindable, computedFrom, observable, TaskQueue } from "aurelia-framework";
import {ITableNotification} from "../table/table-notification";
import {ITableSelectionNotification} from "../table-selection/table-selection-notification";
import {Table} from "../table/table";
import {Databases} from "../databases/databases";
import * as Services from "../../services/export";
import * as Models from "../../models/export";

@autoinject
export class Container {
  constructor(
    private table: Services.TableService,
    private database: Services.DatabaseService,
    private taskQueue: TaskQueue
  ) {
    this.tableData = [];
  }

  @bindable containerContextMenuViewModel: any;
  @bindable databasesViewModel: Databases;
  
  @computedFrom("database", "database.databases")
  get databaseDisabled() {
    return !this.database
      || !this.database.databases;
  }

  tableHeight: string;

  tableData: Models.ITableData[];

  tableSelectionNotification: ITableSelectionNotification = {
    onTableClicked: this.onTableClicked.bind(this)
  }
  tableNotification: ITableNotification = {
    onRelationClicked: this.onRelationClicked.bind(this),
    onDispose: this.onTableDispose.bind(this)
  }

  settingButtonOptions: DevExpress.ui.dxButtonOptions = {
    icon: "fa fa-cog",
    onClick: () => {
      this.containerContextMenuViewModel.instance.show();
    }
  }
  containerContextMenuOptions: DevExpress.ui.dxContextMenuOptions = {
    target: "#settings-button",
    position: { my: "left bottom", at: "top" },
    items: [{
      text: "Alle Tabellen schließen",
      onClick: () => {
        this.table.tables.slice().forEach(c => c.notification.onDispose(c));
      }
    }, {
      text: "Struktur laden",
      beginGroup: true,
      onClick: () => {
        
      }
    }, {
      text: "Struktur speichern",
      onClick: () => {
        
      }
    }, {
      text: "Datenbanken verwalten",
      beginGroup: true,
      onClick: () => {
        this.databasesViewModel.show();
      }
    }],
    bindingOptions: {
      "items[3].disabled": "databaseDisabled"
    }
  }

  private onRelationClicked(databaseId: number, tableName: string, columnName: string, value: any) {
    const table: Models.ITableData = {
      tableId: new Date().getTime(),
      databaseId: databaseId,
      tableName: tableName,
      columnName: columnName,
      value: value,
      rows: 100
    };

    this.tableData.push(table);
    this.queueRefreshTablesLayout();
  }
  private onTableClicked(databaseId: number, tableName: string, alias: string) {
    const table = {
      tableId: new Date().getTime(),
      databaseId: databaseId,
      tableName: tableName,
      alias: alias,
      rows: 100
    };

    this.tableData.push(table);
    this.queueRefreshTablesLayout();
  }
  private onTableDispose(table: Table) {
    let index = this.tableData.findIndex(c => c.tableId == table.tableData.tableId);
    if (index >= 0) {
      this.tableData.splice(index, 1);
    }

    this.queueRefreshTablesLayout();
  }
  private queueRefreshTablesLayout() {
    if (this.tableData.length <= 1) {
      this.tableHeight = "100%";
    } else if (this.tableData.length == 2) {
      this.tableHeight = "50%";
    } else {
      this.tableHeight = "33%";
    }

    this.taskQueue.queueMicroTask(() => {
      this.table.tables.forEach(t => {
        if (!t.tableViewModel || !t.tableViewModel.instance) {
          return;
        }

        const grid: DevExpress.ui.dxDataGrid = t.tableViewModel.instance;
        grid.updateDimensions();
      });
    });
  }
}