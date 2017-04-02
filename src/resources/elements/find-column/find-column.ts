import { autoinject, bindable, observable } from "aurelia-framework";
import { IFindColumnNotification } from "./find-column-notification";
import * as Models from "../../models/export";

@autoinject
export class FindColumn {
  constructor(
  ) {}

  @bindable notification: IFindColumnNotification;
  @bindable tableData: Models.ITableData;

  findColumnPopupVisible: boolean;
  selectedInternalFieldName: string;

  findColumnPopupOptions: DevExpress.ui.dxPopupOptions = {
    contentTemplate: "contentTemplate",
    showCloseButton: false,
    width: "400px",
    height: "auto",
    toolbarItems: [{
      widget: "dxButton",
      location: "before",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Spalte markieren",
        icon: "fa fa-play",
        onClick: () => {
          if (!this.notification) {
            return;
          }

          this.notification.onColumnSelected(this.selectedInternalFieldName);
          this.findColumnPopupVisible = false;
        }
      },
    }, {
      text: "Spalte suchen",
      location: "center"
    }, {
      widget: "dxButton",
      location: "after",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Schließen",
        icon: "fa fa-times",
        onClick: () => {
          this.findColumnPopupVisible = false;
        }
      }
    }],
    onShown: (e) => {
      
    },
    bindingOptions: {
      "visible": "findColumnPopupVisible"
    }
  }
  columnSelectDataOptions: DevExpress.ui.dxSelectBoxOptions = {
    displayExpr: "caption",
    valueExpr: "internalFieldName",
    width: "100%",
    bindingOptions: {
      "dataSource": "tableData.columns",
      "value": "selectedInternalFieldName"
    }
  }
  
  show() {
    this.findColumnPopupVisible = true;
  }
}