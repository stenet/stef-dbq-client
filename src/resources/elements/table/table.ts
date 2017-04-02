import { autoinject, bindable, observable, TaskQueue } from "aurelia-framework";
import { ITableNotification } from "./table-notification";
import { StatementEditor } from "../statement-editor/statement-editor";
import { FindColumn } from "../find-column/find-column";
import { IStatementEditorNotification } from "../statement-editor/statement-editor-notification";
import { IChangeDataNotification } from "../change-data/change-data-notification";
import { IFindColumnNotification } from "../find-column/find-column-notification";
import { ChangeData } from "../change-data/change-data";
import * as Models from "../../models/export";
import * as Services from "../../services/export";

@autoinject
export class Table {
  private _isTableInNewMode: boolean = false;
  private _canvas: any;

  constructor(
    private sql: Services.SqlService,
    private table: Services.TableService,
    private taskQueue: TaskQueue
  ) {
  }

  @bindable tableData: Models.ITableData;
  @bindable notification: ITableNotification;
  @bindable changeDataViewModel: ChangeData;
  @bindable statementEditorViewModel: StatementEditor;
  @bindable findColumnViewModel: FindColumn;
  @observable tableViewModel: any;

  caption: string;
  columns: DevExpress.ui.dxDataGridColumn;
  dataSource: any;
  hasMoreRows: boolean;
  hasChanges: boolean;
  hasSelection: boolean;

  statementEditorNotification: IStatementEditorNotification = {
    onExecute: this.loadData.bind(this)
  }
  changeDataNotification: IChangeDataNotification = {
    onDataChanged: this.setGridData.bind(this)
  }
  findColumnNotification: IFindColumnNotification = {
    onColumnSelected: this.onColumnSelected.bind(this)
  }

  tableOptions: DevExpress.ui.dxDataGridOptions = {
    allowColumnReordering: true,
    allowColumnResizing: true,
    editing: {
      allowUpdating: true,
      mode: "cell"
    },
    pager: {
      allowedPageSizes: [30, 100, 1000],
      showInfo: true,
      showNavigationButtons: true,
      showPageSizeSelector: true,
      visible: true
    },
    paging: {
      enabled: true,
      pageSize: 30
    },
    searchPanel: {
      visible: true
    },
    selection: {
      allowSelectAll: true,
      mode: "multiple",
      selectAllMode: "allPages",
      showCheckBoxesMode: "always"
    },
    sorting: {
      mode: "multiple"
    },
    height: "100%",
    onContextMenuPreparing: (e: any) => {
      if (e.row.rowType === "data") {
        const column = e.column;
        const data = e.row.data;

        const columnInfo = this.tableData.columns.find(c => c.internalFieldName == column.dataField);
        if (!columnInfo || !columnInfo.relatedTableName || !columnInfo.relatedColumnName) {
          return;
        }
        if (data[column.dataField] == void (0)) {
          return;
        }

        e.items = [{
          text: "Verknüpften Datensatz öffnen",
          onItemClick: () => {
            if (!this.notification) {
              return;
            }

            this.notification.onRelationClicked(this.tableData.databaseId, columnInfo.relatedTableName, columnInfo.relatedColumnName, data[column.dataField]);
          }
        }];
      }
    },
    onRowPrepared: (e: any) => {
      if (!e.data || !e.data._state) {
        return;
      }

      switch (e.data._state) {
        case 1:
          e.rowElement.addClass("row-modified");
          break;
        case 2:
          e.rowElement.addClass("row-inserted");
          break;
        case 3:
          e.rowElement.addClass("row-deleted");
          break;
        default:
          break;
      }
    },
    onRowInserted: (e: any) => {
      e.key._state = 2;

      this._isTableInNewMode = false;
      this.hasChanges = true;

      const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
      grid.option("editing.mode", "cell");
      grid.repaint();
    },
    onRowUpdated: (e: any) => {
      if (e.key._state === undefined || e.key._state === 0) {
        e.key._state = 1;

        if (!e.key._changed) {
          e.key._changed = {};
        }

        for (let prop in e.data) {
          e.key._changed[prop] = true;
        }
      }

      this.hasChanges = true;

      const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
      grid.repaint();
    },
    onRowRemoved: (e: any) => {
      const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
      grid.option("editing.mode", "cell");
      grid.repaint();
    },
    onSelectionChanged: (e) => {
      this.hasSelection = e.selectedRowKeys.length > 0;

      const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
      grid.repaint();
    },
    onToolbarPreparing: (e: any) => {
      var dataGrid = e.component;

      e.toolbarOptions.items.push({
        location: "center",
        text: this.caption || "Tabelle"
      }, {
          widget: "dxButton",
          location: "before",
          visible: !this._isTableInNewMode,
          options: <DevExpress.ui.dxButtonOptions>{
            hint: "Statement editieren",
            icon: "fa fa-pencil",
            onClick: () => {
              this.statementEditorViewModel.show();
            }
          }
        }, {
          widget: "dxButton",
          location: "before",
          visible: !this._isTableInNewMode,
          options: <DevExpress.ui.dxButtonOptions>{
            hint: "Daten neu aus Datenbank laden",
            icon: "fa fa-refresh",
            onClick: () => {
              this.loadData();
            }
          }
        }, {
          widget: "dxButton",
          location: "before",
          visible: !this._isTableInNewMode,
          options: <DevExpress.ui.dxButtonOptions>{
            hint: "Daten ändern",
            icon: "fa fa-chain",
            onClick: () => {
              this.changeDataViewModel.show();
            }
          }
        }, {
          widget: "dxButton",
          location: "before",
          visible: !this._isTableInNewMode,
          options: <DevExpress.ui.dxButtonOptions>{
            hint: "Neue Zeile erstellen",
            icon: "fa fa-plus",
            onClick: () => {
              this._isTableInNewMode = true;

              const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
              grid.option("editing.mode", "row");
              grid.addRow();
            }
          }
        }, {
          widget: "dxButton",
          location: "before",
          visible: !this._isTableInNewMode && this.hasChanges,
          options: <DevExpress.ui.dxButtonOptions>{
            hint: "Geänderte Daten speichern",
            icon: "fa fa-floppy-o",
            onClick: () => {
              this.saveData();
            }
          }
        }, {
          widget: "dxButton",
          location: "before",
          visible: this._isTableInNewMode,
          options: <DevExpress.ui.dxButtonOptions>{
            hint: "Änderungen übernehmen",
            icon: "fa fa-check",
            onClick: () => {
              this._isTableInNewMode = false;
              this.hasChanges = true;

              const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
              grid.saveEditData();
              grid.option("editing.mode", "cell");
              grid.repaint();
            }
          }
        }, {
          widget: "dxButton",
          location: "before",
          visible: this._isTableInNewMode,
          options: <DevExpress.ui.dxButtonOptions>{
            hint: "Änderungen verwerfen",
            icon: "fa fa-undo",
            onClick: () => {
              this._isTableInNewMode = false;

              const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
              grid.cancelEditData();
              grid.option("editing.mode", "cell");
            }
          }
        }, {
          widget: "dxButton",
          location: "before",
          visible: !this._isTableInNewMode && this.hasSelection,
          options: <DevExpress.ui.dxButtonOptions>{
            hint: "Markierte Zeilen löschen",
            icon: "fa fa-trash-o",
            onClick: () => {
              const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
              const selectedRows = grid.getSelectedRowsData();

              if (selectedRows.length === 0) {
                DevExpress.ui.dialog.alert(
                  "Bitte markieren Sie zuerst die zu löschenden Zeilen",
                  "Information"
                );
              } else {
                DevExpress.ui.dialog.confirm(
                  `Sind Sie sicher, dass Sie die markierte(n) ${selectedRows.length} Zeile(n) löschen wollen?`,
                  "Frage"
                ).then(r => {
                  if (!r) {
                    return;
                  }

                  grid.getSelectedRowsData().forEach(r => {
                    r._state = 3;
                  });
                  grid.clearSelection();
                  grid.repaint();
                });
              }
            }
          }
        }, {
          widget: "dxButton",
          location: "before",
          options: <DevExpress.ui.dxButtonOptions>{
            hint: "Spalte suchen",
            icon: "fa fa-search",
            onClick: () => {
              this.findColumnViewModel.show();
            }
          }
        }, {
          widget: "dxButton",
          location: "before",
          visible: !this._isTableInNewMode,
          options: <DevExpress.ui.dxButtonOptions>{
            hint: "Daten nach Excel exportieren",
            icon: "fa fa-file-excel-o",
            onClick: () => {
              const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
              grid.exportToExcel(grid.getSelectedRowKeys().length > 0 ? true : false);
            }
          }
        }, {
          location: "after",
          html: "<i class='fa fa-exclamation table-no-all-rows-loaded' title='Es wurden nicht alle Daten geladen'></i>",
          visible: !this._isTableInNewMode && this.hasMoreRows
        },{
          widget: "dxButton",
          location: "after",
          options: <DevExpress.ui.dxButtonOptions>{
            hint: "Tabellen schließen",
            icon: "fa fa-times",
            onClick: () => {
              this.notification.onDispose(this);
            }
          }
        });
    }
  }

  bind() {
    this.loadData();
  }
  attached() {
    this.table.registerTable(this);
  }
  detached() {
    this.table.deregisterTable(this);
  }

  private calcTextWidth(text, ) {
    const canvas = this._canvas || (this._canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = "12pt arial";

    const metrics = context.measureText(text);
    return Math.ceil(metrics.width);
  }
  private calcColumnWidth(data: any[], fieldName: string, header: string): string {
    const min = Math.min(data.length, 15);

    let curr: number = this.calcTextWidth(header);
    for (let i = 0; i < min; i++) {
      const val = data[i][fieldName];

      if (val == void (0)) {
        continue;
      }

      const width = this.calcTextWidth(val);
      if (curr < width) {
        curr = width;
      }
    }

    if (curr > 250) {
      curr = 250;
    } else if (curr < 30) {
      curr = 30;
    }

    return `${curr + 5}px`;
  }
  private loadData() {
    this.sql
      .execute(this.tableData)
      .then(r => {
        if (!r || r.tableId) {
          return;
        }

        this.tableData = r.tableData;
        this.caption = `${this.tableData.tables} [${this.tableData.tableId}]`;
        this.hasChanges = false;
        this.hasSelection = false;
        
        const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
        
        const columns = this.tableData.columns.map((c: Models.IColumnInfo) => <DevExpress.ui.dxDataGridColumn>{
          caption: c.caption,
          dataField: c.internalFieldName,
          width: this.calcColumnWidth(r.result.data, c.internalFieldName, c.caption),
          cssClass: r.columnsSave.find(d => d.internalFieldName === c.internalFieldName) ? null : "column-disabled"
        });
        if (!this.tableData.changeData) {
          this.tableData.changeData = [];
        }

        let infoText = "Seite {0} von {1}";

        this.hasMoreRows = r.result.hasMoreRows;
        if (r.result.hasMoreRows) {
          infoText += " (es wurden nicht alle Daten geladen)";
        } else {
          infoText += " ({2} Datensätze)";
        }

        grid.option("pager.infoText", infoText)
        grid.option("columns", columns);        
        this.setGridData(r.result.data);
      });
  }
  private saveData() {
    const tableData = Object.assign({}, this.tableData);
    tableData.data = this.dataSource.filter(c => {
      return !!c._state;
    });

    this.sql
      .save(tableData)
      .then(r => {
        if (r && r.ok) {
          this.loadData();
        }
      });
  }
  private setGridData(data: any[]) {
    const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
    grid.option("dataSource", data);
    this.dataSource = data;

    this.hasChanges = data.some(c => c["_state"] && c["_state"] != 0);

    grid.repaint();
  }
  private onColumnSelected(columnName: string) {
    if (!columnName) {
      return;
    }

    const grid: DevExpress.ui.dxDataGrid = this.tableViewModel.instance;
    const columns: DevExpress.ui.dxDataGridColumn[] = grid.option("columns");

    const column = grid.getCellElement(0, columnName);
    if (!column) {
      return;
    }

    grid.focus(column);
  }
}