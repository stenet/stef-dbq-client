import { autoinject, computedFrom, bindable, observable } from "aurelia-framework";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { ITableSelectionNotification } from "./table-selection-notification";
import { TableInformation } from "../table-information/table-information";
import * as Services from "../../services/export";
import * as Models from "../../models/export";
import * as EAConstants from "../../event-aggregator-constants";

@autoinject
export class TableSelection {
  constructor(
    private database: Services.DatabaseService,
    private sql: Services.SqlService,
    private eventAggregator: EventAggregator
  ) { }

  @bindable notification: ITableSelectionNotification;
  @bindable tableInformationViewModel: TableInformation;
  @observable databaseId: number;
  tables: Models.ITable[];

  databaseRemovedSubscription: Subscription;

  @computedFrom("database", "database.databases")
  get databaseDisabled() {
    return !this.database
      || !this.database.databases;
  }

  databaseOptions: DevExpress.ui.dxLookupOptions = {
    valueExpr: "id",
    displayExpr: "caption",
    bindingOptions: {
      value: "databaseId",
      dataSource: "database.databases",
      disabled: "databaseDisabled"
    }
  }

  tableOptions: DevExpress.ui.dxDataGridOptions = {
    searchPanel: {
      visible: true
    },
    hoverStateEnabled: true,
    scrolling: {
      mode: "virtual",
      preloadEnabled: true
    },
    columns: [{
      dataField: "tableName",
      caption: "Tabelle"
    }],
    showColumnHeaders: false,
    bindingOptions: {
      dataSource: "tables"
    },
    height: "100%",
    onContextMenuPreparing: (e: any) => {
      if (e.row.rowType === "data") {
        e.items = <DevExpress.ui.dxContextMenuOptions>[{
          text: "Tabelle erstellen",
          onItemClick: () => {
            if (!this.notification) {
              return;
            }
            
            this.notification.onTableClicked(this.databaseId, e.row.data.tableName);
          }
        },
        {
          text: "Tabelle mit Alias erstellen",
          onItemClick: () => {
            if (!this.notification) {
              return;
            }

            this.notification.onTableClicked(this.databaseId, e.row.data.tableName, "a");
          }
        },
        {
          text: "Tabelleninformation anzeigen",
          beginGroup: true,
          onItemClick: () => {
            this.tableInformationViewModel.show(this.databaseId, e.row.data.tableName);
          }
        }];
      }
    },
    onRowClick: (e: any) => {
      if (!this.notification) {
        return;
      }

      this.notification.onTableClicked(this.databaseId, e.data.tableName);
    },
    onToolbarPreparing: (e: any) => {
      var dataGrid = e.component;

      e.toolbarOptions.items.unshift({
        location: "before",
        text: "Tabellen"
      });
    }
  }

  attached() {
    this.databaseRemovedSubscription = this.eventAggregator.subscribe(EAConstants.DATABASE_REMOVED, (e) => {
      if (this.databaseId == e){
        this.databaseId = null;
      }
    })
  }
  detached() {
    this.databaseRemovedSubscription.dispose();
  }

  databaseIdChanged(newValue, oldValue) {
    if (newValue) {
      this.database.getTables(newValue).then(r => {
        this.tables = r;
      });
    } else {
      this.tables = [];
    }
  }
}