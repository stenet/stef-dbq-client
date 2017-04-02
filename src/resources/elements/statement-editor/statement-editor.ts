import { autoinject, bindable } from "aurelia-framework";
import { Editor } from "../editor/editor";
import { Table } from "../table/table";
import { TableSelection } from "../table-selection/table-selection";
import { ColumnChooser } from "../column-chooser/column-chooser";
import { ITableSelectionNotification } from "../table-selection/table-selection-notification";
import { IStatementEditorNotification } from "./statement-editor-notification";
import { IColumnChooserNotification } from "../column-chooser/column-chooser-notification";
import * as Models from "../../models/export";
import * as Services from "../../services/export";

@autoinject
export class StatementEditor {
  constructor(
    private sql: Services.SqlService,
    private table: Services.TableService
  ) { }

  @bindable editorData: Models.ITableData;
  @bindable tableData: Models.ITableData;
  @bindable notification: IStatementEditorNotification;
  @bindable tableSelectionViewModel: TableSelection;
  @bindable editorViewModel: Editor;
  @bindable columnChooserViewModel: ColumnChooser;

  fixedTableId: number;
  statementPopupVisible: boolean;
  maxRowsNumberBox: DevExpress.ui.dxNumberBox;

  tableSelectionNotification: ITableSelectionNotification = {
    onTableClicked: this.onTableClicked.bind(this)
  }
  columnChooserNotification: IColumnChooserNotification = {
    onColumnClicked: this.onColumnChooserColumnClicked.bind(this)
  }

  statementPopupOptions: DevExpress.ui.dxPopupOptions = {
    contentTemplate: "contentTemplate",
    showCloseButton: false,
    toolbarItems: [{
      widget: "dxButton",
      location: "before",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Statement ausführen",
        icon: "fa fa-play",
        onClick: () => {
          this.editorViewModel.setScriptToData();
          this.editorData.databaseId = this.tableSelectionViewModel.databaseId;
          this.editorData.rows = this.getMaxRows();

          if (this.columnChooserViewModel.selectedTableId) {
            this.tableData.referencedTableDataId = this.columnChooserViewModel.selectedTableId;
          } else {
            this.tableData.referencedTableDataId = null;
          }

          if (this.notification) {
            this.notification.onExecute();
          }

          this.statementPopupVisible = false;
        }
      },
    }, {
      widget: "dxButton",
      location: "before",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Statement formatieren",
        icon: "fa fa-align-left",
        onClick: () => {
          this.sql.formatSql(this.editorViewModel.getValue())
            .then(r => {
              this.editorViewModel.setValue(r.script);
            });
        }
      },
    }, {
      text: "Statement editieren",
      location: "center"
    }, {
      widget: "dxNumberBox",
      location: "after",
      options: <DevExpress.ui.dxNumberBoxOptions>{
        hint: "Anzahl zu lesende Datensätze",
        min: -1,
        showSpinButtons: true,
        onInitialized: (e) => {
          this.maxRowsNumberBox = e.component;
        }
      },
    }, {
      widget: "dxButton",
      location: "after",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Schließen",
        icon: "fa fa-times",
        onClick: () => {
          this.statementPopupVisible = false;
        }
      }
    }],
    onShown: (e) => {
      this.setMaxRows(this.editorData.rows);
      this.tableSelectionViewModel.databaseId = this.editorData.databaseId;

      if (this.tableData.referencedTableData) {
        this.columnChooserViewModel.selectedTableId = this.tableData.referencedTableData.tableId;
      } else {
        this.columnChooserViewModel.selectedTableId = this.fixedTableId;
      }
      
      this.editorViewModel.refresh();
    },
    bindingOptions: {
      "visible": "statementPopupVisible"
    }
  }

  show() {
    if (this.tableData == this.editorData) {
      this.fixedTableId = null;
    } else {
      this.fixedTableId = this.tableData.tableId;
    }
    this.statementPopupVisible = true;
  }

  private getMaxRows() {
    return this.maxRowsNumberBox.option("value");
  }
  private setMaxRows(value: number) {
    this.maxRowsNumberBox.option("value", value);
  }
  private onColumnChooserColumnClicked(columnName: string) {
    this.editorViewModel.insertText(`<#${columnName}#>`);
  }
  private onTableClicked(databaseId: number, tableName: string, alias: string) {
    const tableData: Models.ITableData = {
      databaseId: databaseId,
      tableName: tableName,
      alias: alias,
      tableId: new Date().getTime()
    }

    this.sql
      .selectSql(tableData)
      .then(r => {
        this.editorViewModel.setValue(r.tableData.script);
      });
  }
}