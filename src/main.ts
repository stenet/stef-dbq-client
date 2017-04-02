import { Aurelia } from 'aurelia-framework'
import environment from './environment';

declare const requirejs;

//Configure Bluebird Promises.
(<any>Promise).config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature("framework/base")
    .feature("framework/dx")
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  requirejs.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' } });
  requirejs(["vs/editor/editor.main"]);

  aurelia.start().then(() => {
    DevExpress.localization.locale("de");

    DevExpress.ui.dxContextMenu.defaultOptions({
      options: {
        animation: null
      }
    });
    DevExpress.ui.dxPopup.defaultOptions({
      options: {
        animation: null
      }
    });
    DevExpress.ui.dxPopover.defaultOptions({
      options: {
        animation: null
      }
    });
    DevExpress.ui.dxSelectBox.defaultOptions({
      options: {
        searchEnabled: true
      }
    });

    aurelia.setRoot()
  });
}
