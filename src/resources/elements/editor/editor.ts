import { autoinject, bindable } from "aurelia-framework";
import * as Models from "../../models/export";

declare const requirejs;

@autoinject
export class Editor {
  constructor(
    private element: Element
  ) { }

  instance: monaco.editor.ICodeEditor;
  @bindable tableData: Models.ITableData;
  @bindable language: string;

  attached() {
    this.instance = monaco.editor.create(<any>this.element, {
      language: this.language || "sql",
      automaticLayout: true,
      wordWrap: true
    });
  }

  insertText(text: string) {
    const sel = this.instance.getSelection();
    
    this.instance.executeEdits(
      "text-placeholder", [{ 
        identifier: { major: 1, minor: 0 }, 
        range: sel, 
        text: text, 
        forceMoveMarkers: true }]);

    this.instance.focus();
  }

  setScriptToData() {
    this.tableData.script = this.getValue();
  }

  refresh() {
    this.setValue(this.tableData.script);
  }
  getValue(): string {
    return this.instance.getValue();
  }
  setValue(value: string) {
    this.instance.setValue(value || "");
  }
}