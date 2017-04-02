import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .globalResources("./elements/table-selection/table-selection")
    .globalResources("./elements/table/table")
    .globalResources("./elements/editor/editor")
    .globalResources("./elements/databases/databases")
    .globalResources("./elements/find-column/find-column")
    .globalResources("./elements/column-chooser/column-chooser")
    .globalResources("./elements/change-data/change-data")
    .globalResources("./elements/code-editor/code-editor")
    .globalResources("./elements/statement-editor/statement-editor")
    .globalResources("./elements/table-information/table-information")
    .globalResources("./elements/container/container");
}
