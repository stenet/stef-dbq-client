import { autoinject } from "aurelia-framework";
import * as Services from "../../services/export";

@autoinject
export class TableInformation {
  constructor(
    private sql: Services.SqlService
  ) {}

  tableInfoPopupVisible: boolean;
  tableInfo: any;

  tableInfoPopupOptions: DevExpress.ui.dxPopupOptions = {
    contentTemplate: "contentTemplate",
    showCloseButton: false,
    toolbarItems: [{
        text: "Tabelleninformation",
        location: "center"
      },{
      widget: "dxButton",
      location: "after",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Schließen",
        icon: "fa fa-times",
        onClick: () => {
          this.tableInfoPopupVisible = false;
        }
      }
    }],
    onShown: (e) => {
    },
    bindingOptions: {
      "visible": "tableInfoPopupVisible"
    }
  }
  tableInfoGridOptions: DevExpress.ui.dxDataGridOptions = {
    columns: [{
      dataField: "columnName",
      caption: "Spalte"
    },{
      dataField: "typeName",
      caption: "Typ"
    },{
      dataField: "maxLength",
      caption: "Max. Länge",
      width: "100px"
    },{
      dataField: "isNullable",
      caption: "Null?",
      width: "100px"
    },{
      dataField: "relatedTableName",
      caption: "FK Tabelle"
    },{
      dataField: "relatedColumnName",
      caption: "FK Spalte"
    }],
    height: "100%",
    bindingOptions: {
      "dataSource": "tableInfo.columns"
    }
  }

  show(databaseId: number, tableName: string) {
    this.sql
      .tableInfo(databaseId, tableName)
      .then(r => {
        this.tableInfo = r;
      });

    this.tableInfoPopupVisible = true;
  }
}