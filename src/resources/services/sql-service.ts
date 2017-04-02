import { autoinject } from "aurelia-framework";
import { RestService } from "../../framework/base/services/export";
import { TableService } from "./table-service";
import * as Models from "../models/export";

@autoinject
export class SqlService {
  constructor(
    private rest: RestService,
    private table: TableService
  ) { }

  execute(tableData: Models.ITableData): Promise<any> {
    this.checkReferencedTableData(tableData);

    const promise = new Promise<any>((resolve, reject) => {
      this
        .post("Sql/Execute", tableData)
        .then(result => {
          this.checkResult(resolve, reject, result);
        }).catch(error => {
          reject(error);
        });
    });

    return promise;
  }
  executeChanges(tableData: Models.ITableData): Promise<any> {
    this.checkReferencedTableData(tableData);

    const promise = new Promise<any>((resolve, reject) => {
      this
        .post("Sql/ExecuteChanges", tableData)
        .then(result => {
          this.checkResult(resolve, reject, result);
        }).catch(error => {
          reject(error);
        });
    });

    return promise;
  }
  formatSql(script: string): Promise<any> {
    return this
      .post("Sql/FormatSql", {
        script: script
      });
  }
  save(tableData: Models.ITableData): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this
        .post("Sql/Save", tableData)
        .then(result => {
          this.checkResult(resolve, reject, result);
        }).catch(error => {
          reject(error);
        });
    });

    return promise;
  }
  selectSql(tableData: Models.ITableData): Promise<any> {
    return this
      .post("Sql/SelectSql", tableData);
  }
  tableInfo(databaseId: number, tableName: string): Promise<any> {
    return this
      .post("Sql/TableInfo", {
        databaseId: databaseId,
        tableName: tableName
      });
  }

  private checkReferencedTableData(tableData: Models.ITableData) {
    if (tableData.referencedTableDataId) {
      const referencedTable = this.table.tables.find(c => c.tableData.tableId == tableData.referencedTableDataId);

      if (referencedTable) {
        tableData.referencedTableData = {
          tableId: tableData.referencedTableDataId,
          databaseId: tableData.databaseId,
          columns: tableData.columns,
        }

        tableData.data = referencedTable.dataSource;
      } else {
        tableData.referencedTableData = null;
        tableData.data = null;
      }
    } else {
      tableData.referencedTableData = null;
      tableData.data = null;
    }
  }
  private checkResult(resolve, reject, result) {
    if (result.exception) {
      DevExpress.ui.dialog.alert(
        result.exception,
        "Fehler");

        reject();
    } else if (result.transactionId != void(0)) {
      DevExpress.ui.dialog.confirm(
        `${result.changedRows} Datensätze wurden geändert. Speichern?`,
        "Frage"
      ).then(dialogResult => {
        if (dialogResult) {
          this.commit(resolve, reject, result);
        } else {
          this.rollback(resolve, reject, result);
        }
      });
    } else {
      resolve(result);
    }
  }
  private commit(resolve, reject, result) {
    this
      .post("Sql/Commit", {
        transactionId: result.transactionId
      }).then(commitResult => {
        resolve(commitResult);

        if (!commitResult.ok) {
          DevExpress.ui.dialog.alert(
            "Fehler beim Commit",
            "Information"
          );
        }
      }).catch(error => {
        reject(error);
      });
  }
  private rollback(resolve, reject, result) {
    this
      .post("Sql/Rollback", {
        transactionId: result.transactionId
      }).then(rollbackResult => {
        resolve(rollbackResult);

        if (!rollbackResult.ok) {
          DevExpress.ui.dialog.alert(
            "Fehler beim Rollback",
            "Information"
          );
        }
      }).catch(error => {
        reject(error);
      });
  }
  private post(url: string, data: any): Promise<any> {
    return this.rest
      .post({
        url: this.rest.getApiUrl(url),
        data: data
      });
  }
}