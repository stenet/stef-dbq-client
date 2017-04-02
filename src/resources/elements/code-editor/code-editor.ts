import { autoinject, bindable } from "aurelia-framework";
import { Editor } from "../editor/editor";
import { ICodeEditorNotification } from "./code-editor-notification";
import { IColumnChooserNotification } from "../column-chooser/column-chooser-notification";
import { ColumnChooser } from "../column-chooser/column-chooser";
import { Table } from "../table/table";
import * as Models from "../../models/export";
import * as Services from "../../services/export";

@autoinject
export class CodeEditor {
  constructor(
    private table: Services.TableService
  ){ }

  @bindable tableData: Models.ITableData;
  @bindable editorData: Models.ITableData;
  @bindable notification: ICodeEditorNotification;
  @bindable editorViewModel: Editor;
  @bindable columnChooserViewModel: ColumnChooser;
  
  fixedTableId: number;
  codePopupVisible: boolean;

  columnChooserNotification: IColumnChooserNotification = {
    onColumnClicked: this.onColumnChooserColumnClicked.bind(this)
  }

  codePopupOptions: DevExpress.ui.dxPopupOptions = {
    contentTemplate: "contentTemplate",
    showCloseButton: false,
    toolbarItems: [{
      widget: "dxButton",
      location: "before",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Code ausführen",
        icon: "fa fa-play",
        onClick: () => {
          this.editorViewModel.setScriptToData();

          if (this.columnChooserViewModel.selectedTableId) {
            this.tableData.referencedTableDataId = this.columnChooserViewModel.selectedTableId;
          } else {
            this.tableData.referencedTableDataId = null;
          }

          if (this.notification) {
            this.notification.onExecute();
          }

          this.codePopupVisible = false;
        }
      },
    }, {
      text: "Code editieren",
      location: "center"
    }, {
      widget: "dxButton",
      location: "after",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Schließen",
        icon: "fa fa-times",
        onClick: () => {
          this.codePopupVisible = false;
        }
      }
    }],
    onShown: (e) => {
      if (this.tableData.referencedTableData) {
        this.columnChooserViewModel.selectedTableId = this.tableData.referencedTableData.tableId;
      } else {
        this.columnChooserViewModel.selectedTableId = this.fixedTableId;
      }
      
      this.editorViewModel.refresh();
    },
    bindingOptions: {
      "visible": "codePopupVisible"
    }
  }

  show() {
    if (this.tableData == this.editorData) {
      this.fixedTableId = null;
    } else {
      this.fixedTableId = this.tableData.tableId;
    }

    this.codePopupVisible = true;
  }

  private onColumnChooserColumnClicked(columnName: string) {
    this.editorViewModel.insertText(`eval.GetValue('${columnName}')`);
  }
}