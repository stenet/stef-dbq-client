import { autoinject, bindable, observable } from "aurelia-framework";
import * as Models from "../../models/export";
import * as Services from "../../services/export";

@autoinject
export class Databases {
  constructor(
    private database: Services.DatabaseService
  ) {
    database.getProviders()
      .then(r => {
        this.providers = r;
      });
  }

  databasesPopupVisible: boolean;
  providers: Models.IDatabaseProvider[];

  databasesPopupOptions: DevExpress.ui.dxPopupOptions = {
    contentTemplate: "contentTemplate",
    showCloseButton: false,
    toolbarItems: [{
      widget: "dxButton",
      location: "before",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Datenbank hinzufügen",
        icon: "fa fa-plus",
        onClick: () => {
          this.database.databases.push({});
        }
      }
    }, {
      text: "Datenbanken konfigurieren",
      location: "center"
    }, {
      widget: "dxButton",
      location: "after",
      options: <DevExpress.ui.dxButtonOptions>{
        hint: "Schließen",
        icon: "fa fa-times",
        onClick: () => {
          this.databasesPopupVisible = false;
        }
      }
    }],
    onHiding: () => {
      this.database.reload();
    },
    onShown: (e) => {
      
    },
    bindingOptions: {
      "visible": "databasesPopupVisible"
    }
  }
  providerSelectOptions: DevExpress.ui.dxSelectBoxOptions = {
    displayExpr: "name",
    valueExpr: "fullName",
    width: "300px",
    bindingOptions: {
      "dataSource": "providers",
      "value": "databaseItem.providerName"
    }
  }
  nameTextOptions: DevExpress.ui.dxTextBoxOptions = {
    width: "300px",
    bindingOptions: {
      "value": "databaseItem.caption"
    }
  }
  connectionStringTextOptions: DevExpress.ui.dxTextBoxOptions = {
    width: "100%",
    bindingOptions: {
      "value": "databaseItem.connectionString"
    }
  }
  saveDatabaseButtonOptions: DevExpress.ui.dxButtonOptions = {
    text: "Speichern",
    icon: "fa fa-floppy-o",
    onClick: (e) => {
      this.database.postDatabase(e.model.databaseItem);
    }
  }
  deleteDatabaseButtonOptions: DevExpress.ui.dxButtonOptions = {
    text: "Entfernen",
    icon: "fa fa-trash-o",
    onClick: (e) => {
      this.database.deleteDatabase(e.model.databaseItem);
    }
  }
  
  show() {
    this.databasesPopupVisible = true;
  }
}