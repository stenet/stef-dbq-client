import { autoinject, bindable, observable } from "aurelia-framework";
import { StatementEditor } from "../statement-editor/statement-editor";
import { IStatementEditorNotification } from "../statement-editor/statement-editor-notification";
import { CodeEditor } from "../code-editor/code-editor";
import { ICodeEditorNotification } from "../code-editor/code-editor-notification";
import { IChangeDataNotification } from "./change-data-notification";
import * as Models from "../../models/export";
import * as Services from "../../services/export";

@autoinject
export class ChangeData {
  constructor(
    private sql: Services.SqlService
  ) {}

  @bindable notification: IChangeDataNotification;
  @bindable tableData: Models.ITableData;
  @bindable dataSource: any[];
  @bindable statementEditorViewModel: StatementEditor;
  @bindable codeEditorViewModel: CodeEditor;

  changeDataPopupVisible: boolean;

  statementEditorNotification: IStatementEditorNotification = {
    onExecute: this.onStatementEditorExecute.bind(this)
  }
  codeEditorNotification: IStatementEditorNotification = {
    onExecute: this.onCodeEditorExecute.bind(this)
  }

  changeDataPopupOptions: DevExpress.ui.dxPopupOptions = {
    contentTemplate: "contentTemplate",
    showCloseButton: false,
    width: "800px",
    toolbarItems: [{
      widget: "dxButton",
      location: "before",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Änderungen ausführen",
        icon: "fa fa-play",
        onClick: () => {
          this.sql
            .executeChanges(this.tableData)
            .then(r => {
              if (this.notification) {
                this.notification.onDataChanged(r.data);
              }

              this.changeDataPopupVisible = false;
            });
        }
      },
    }, {
      widget: "dxButton",
      location: "before",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "SQL",
        icon: "fa fa-database",
        onClick: () => {
          this.tableData.changeData.push({
            type: "sql",
            databaseId: this.tableData.databaseId
          });
        }
      },
    }, {
      widget: "dxButton",
      location: "before",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Text",
        icon: "fa fa-font",
        onClick: () => {
          this.tableData.changeData.push({
            type: "text"
          });
        }
      },
    }, {
      widget: "dxButton",
      location: "before",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Laufende Nummer",
        icon: "fa fa-list-ol",
        onClick: () => {
          this.tableData.changeData.push({
            type: "running"
          });
        }
      },
    }, {
      widget: "dxButton",
      location: "before",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Skript",
        icon: "fa fa-code",
        onClick: () => {
          this.tableData.changeData.push({
            type: "code"
          });
        }
      },
    }, {
      text: "Änderungen",
      location: "center"
    }, {
      widget: "dxButton",
      location: "after",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Schließen",
        icon: "fa fa-times",
        onClick: () => {
          this.changeDataPopupVisible = false;
        }
      }
    }],
    onShown: (e) => {
      
    },
    bindingOptions: {
      "visible": "changeDataPopupVisible"
    }
  }
  columnChangeDataOptions: DevExpress.ui.dxSelectBoxOptions = {
    displayExpr: "caption",
    valueExpr: "internalFieldName",
    width: "300px",
    bindingOptions: {
      "dataSource": "tableData.columns",
      "value": "changeDataItem.internalFieldName"
    }
  }
  sqlChangeDataOptions: DevExpress.ui.dxButtonOptions = {
    text: "SQL editieren",
    width: "150px",
    onClick: (e) => {
      this.statementEditorViewModel.editorData = e.model.changeDataItem;
      this.statementEditorViewModel.show();
    }
  }
  textChangeDataOptions: DevExpress.ui.dxTextBoxOptions = {
    width: "150px",
    bindingOptions: {
      "value": "changeDataItem.text"
    }
  }
  runningChangeDataOptions: DevExpress.ui.dxNumberBoxOptions = {
    width: "150px",
    bindingOptions: {
      "value": "changeDataItem.running"
    }
  }
  codeChangeDataOptions: DevExpress.ui.dxButtonOptions = {
    width: "150px",
    text: "Code editieren",
    onClick: (e) => {
      this.codeEditorViewModel.editorData = e.model.changeDataItem;
      this.codeEditorViewModel.show();
    }
  }
  deleteChangeDataOptions: DevExpress.ui.dxButtonOptions = {
    text: "Entfernen",
    icon: "fa fa-trash-o",
    onClick: (e) => {
      const index = this.tableData.changeData.indexOf(e.model.changeDataItem);
      if (index < 0) {
        return;
      }

      this.tableData.changeData.splice(index, 1);
    }
  }

  show() {
    this.changeDataPopupVisible = true;
  }

  private onStatementEditorExecute() {

  }
  private onCodeEditorExecute() {

  }
}