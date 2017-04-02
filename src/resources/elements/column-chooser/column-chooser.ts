import { autoinject, bindable, observable } from "aurelia-framework";
import { IColumnChooserNotification } from "./column-chooser-notification";
import { Table } from "../table/table";
import * as Services from "../../services/export";
import * as Models from "../../models/export";

@autoinject
export class ColumnChooser {
  constructor(
    private table: Services.TableService
  ) {}

  @bindable notification: IColumnChooserNotification;
  @bindable @observable fixedTableId: number;
  @bindable @observable selectedTableId: number;

  tableSelectDisabled: boolean;
  columns: Models.IColumnInfo[];

  tableSelectOptions: DevExpress.ui.dxSelectBoxOptions = {
    displayExpr: "caption",
    valueExpr: "tableData.tableId",
    bindingOptions: {
      "dataSource": "table.tables",
      "value": "selectedTableId",
      "disabled": "tableSelectDisabled"
    }
  }
  columnGridOptions: DevExpress.ui.dxDataGridOptions = {
    searchPanel: {
      visible: true
    },
    hoverStateEnabled: true,
    scrolling: {
      mode: "virtual",
      preloadEnabled: true
    },
    columns: [{
      dataField: "caption",
      caption: "Spalte",
      sortIndex: 0,
      sortOrder: "asc"
    }],
    showColumnHeaders: false,
    height: "100%",    
    onRowClick: (e: any) => {
      if (!this.notification) {
        return;
      }

      this.notification.onColumnClicked(e.data.caption);
    },
    onToolbarPreparing: (e: any) => {
      var dataGrid = e.component;

      e.toolbarOptions.items.unshift({
        location: "before",
        text: "Spalten"
      });
    },
    bindingOptions: {
      dataSource: "columns"
    }
  }

  private fixedTableIdChanged(newValue, oldValue) {
    this.tableSelectDisabled = !!newValue;

    if (newValue) {
      this.selectedTableId = newValue;
    } else {
      this.selectedTableId = null;
    }
  }
  private selectedTableIdChanged(newValue, oldValue) {
    if (newValue) {
      this.columns = this.table.getTableDataByTableId(newValue).columns;
    } else {
      this.columns = [];
    }
  }
}