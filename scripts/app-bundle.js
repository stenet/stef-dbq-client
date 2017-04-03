define('app',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
        }
        return App;
    }());
    exports.App = App;
});

define('config',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        apiUrl: "http://10.20.50.53/DBQ/api/"
    };
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Promise.config({
        longStackTraces: environment_1.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature("framework/base")
            .feature("framework/dx")
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        requirejs.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' } });
        requirejs(["vs/editor/editor.main"]);
        aurelia.start().then(function () {
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
            aurelia.setRoot();
        });
    }
    exports.configure = configure;
});

define('resources/event-aggregator-constants',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DATABASE_REMOVED = "DATABASE_REMOVED";
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
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
    exports.configure = configure;
});

define('framework/dx/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config
            .globalResources("devextreme")
            .globalResources("./elements/dx-widget");
    }
    exports.configure = configure;
});

define('framework/base/event-args/custom-event-args',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/services/object-info-service',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObjectInfoService = (function () {
        function ObjectInfoService() {
        }
        ObjectInfoService.prototype.equal = function (x, y) {
            var _this = this;
            if (x === null || x === undefined || y === null || y === undefined) {
                return x === y;
            }
            if (x.constructor !== y.constructor) {
                return false;
            }
            if (x instanceof Function) {
                return x === y;
            }
            if (x instanceof RegExp) {
                return x === y;
            }
            if (x === y || x.valueOf() === y.valueOf()) {
                return true;
            }
            if (Array.isArray(x) && x.length !== y.length) {
                return false;
            }
            if (x instanceof Date) {
                return false;
            }
            if (!(x instanceof Object)) {
                return false;
            }
            if (!(y instanceof Object)) {
                return false;
            }
            var p = Object.keys(x);
            return Object.keys(y).every(function (i) {
                return p.indexOf(i) !== -1;
            }) && p.every(function (i) {
                return _this.equal(x[i], y[i]);
            });
        };
        return ObjectInfoService;
    }());
    exports.ObjectInfoService = ObjectInfoService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('framework/base/classes/custom-event',["require", "exports", "aurelia-framework", "../services/object-info-service"], function (require, exports, aurelia_framework_1, object_info_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CustomEvent = (function () {
        function CustomEvent(objectInfo, taskQueue) {
            this.objectInfo = objectInfo;
            this.taskQueue = taskQueue;
            this.delegates = [];
            this.argsQueue = [];
            this.waitTimeout = 0;
        }
        CustomEvent.prototype.register = function (action) {
            var _this = this;
            this.delegates.push(action);
            return function () {
                var indexOf = _this.delegates.indexOf(action);
                if (indexOf < 0) {
                    return;
                }
                _this.delegates.splice(indexOf, 1);
            };
        };
        CustomEvent.prototype.fire = function (args) {
            if (this.waitTimeout === 0) {
                return Promise.all(this.delegates.map(function (item) { return item(args); }));
            }
            else {
                if (this.timeoutCancel) {
                    clearTimeout(this.timeoutCancel);
                    this.timeoutCancel = null;
                }
                for (var _i = 0, _a = this.argsQueue; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (this.objectInfo.equal(item, args)) {
                        return;
                    }
                }
                this.argsQueue.push(args);
                this.timeoutCancel = setTimeout(this.fireQueue.bind(this), this.waitTimeout);
            }
        };
        CustomEvent.prototype.fireQueue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var argsQueue;
                return __generator(this, function (_a) {
                    argsQueue = this.argsQueue.slice(0);
                    this.argsQueue.splice(0, this.argsQueue.length);
                    argsQueue.forEach(function (args) {
                        _this.taskQueue.queueTask(function () {
                            return Promise.all(_this.delegates.map(function (item) { return item(args); }));
                        });
                    });
                    return [2 /*return*/];
                });
            });
        };
        return CustomEvent;
    }());
    CustomEvent = __decorate([
        aurelia_framework_1.autoinject,
        aurelia_framework_1.transient(),
        __metadata("design:paramtypes", [object_info_service_1.ObjectInfoService,
            aurelia_framework_1.TaskQueue])
    ], CustomEvent);
    exports.CustomEvent = CustomEvent;
});

define('framework/base/classes/export',["require", "exports", "./custom-event"], function (require, exports, custom_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CustomEvent = custom_event_1.CustomEvent;
});

define('framework/base/event-args/unauthorized',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/event-args/location-go-to',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/enumerations/shortcuts',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shortcuts;
    (function (Shortcuts) {
        Shortcuts[Shortcuts["save"] = 0] = "save";
        Shortcuts[Shortcuts["saveAndNew"] = 1] = "saveAndNew";
        Shortcuts[Shortcuts["delete"] = 2] = "delete";
        Shortcuts[Shortcuts["new"] = 3] = "new";
    })(Shortcuts = exports.Shortcuts || (exports.Shortcuts = {}));
});

define('framework/base/enumerations/export',["require", "exports", "./shortcuts"], function (require, exports, shortcuts_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(shortcuts_1);
});

define('framework/base/event-args/shortcut-execute',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/event-args/export',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/interfaces/data-source-option-filter',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/interfaces/data-source-options',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/interfaces/scope',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/interfaces/expression-provider',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/interfaces/rest-delete-options',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/interfaces/rest-get-options',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/interfaces/rest-post-options',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/interfaces/style-property',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/interfaces/style-class',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('framework/base/interfaces/export',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/services/json-service',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JsonService = (function () {
        function JsonService() {
            this.regexDateISO = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
        }
        JsonService.prototype.parse = function (json) {
            var _this = this;
            if (!json) {
                return json;
            }
            if (!(typeof json === "string")) {
                json = JSON.stringify(json);
            }
            return JSON.parse(json, function (key, value) {
                if (typeof value === "string" && value.indexOf("{") < 0) {
                    var a = _this.regexDateISO.exec(value);
                    if (a) {
                        return new Date(value);
                    }
                    return value;
                }
                return value;
            });
        };
        JsonService.prototype.stringify = function (obj) {
            return JSON.stringify(obj);
        };
        return JsonService;
    }());
    JsonService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [])
    ], JsonService);
    exports.JsonService = JsonService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/services/rest-service',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "../classes/custom-event", "./json-service", "../../../config"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, custom_event_1, json_service_1, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RestService = (function () {
        function RestService(json, onUnauthorizated) {
            this.json = json;
            this.onUnauthorizated = onUnauthorizated;
            this.loadingCount = 0;
        }
        Object.defineProperty(RestService.prototype, "isLoading", {
            get: function () {
                return this.loadingCount > 0;
            },
            enumerable: true,
            configurable: true
        });
        RestService.prototype.delete = function (options) {
            if (!options.id) {
                throw new Error("Id is missing");
            }
            return this.execute("DELETE", options.url + "/" + options.id, this.createHeaders(), options.increaseLoadingCount);
        };
        RestService.prototype.get = function (options) {
            return this.execute("GET", options.url, this.createHeaders(options), options.increaseLoadingCount);
        };
        RestService.prototype.post = function (options) {
            var body = null;
            if (options.data) {
                if (typeof options.data === "string") {
                    body = options.data;
                }
                else {
                    body = this.json.stringify(options.data);
                }
            }
            return this.execute("POST", options.url, this.createHeaders(options), options.increaseLoadingCount, body);
        };
        RestService.prototype.put = function (options) {
            var body = null;
            if (options.data) {
                if (typeof options.data === "string") {
                    body = options.data;
                }
                else {
                    body = this.json.stringify(options.data);
                }
            }
            return this.execute("PUT", options.url, this.createHeaders(options), options.increaseLoadingCount, body);
        };
        RestService.prototype.getUrl = function (suffix) {
            return config_1.default["baseUrl"] + "/" + suffix;
        };
        RestService.prototype.getApiUrl = function (suffix) {
            return config_1.default["apiUrl"] + "/" + suffix;
        };
        RestService.prototype.getWebApiUrl = function (suffix) {
            return config_1.default["webApiUrl"] + "/" + suffix;
        };
        RestService.prototype.getAppUrl = function (suffix) {
            return config_1.default["appUrl"] + "/" + suffix;
        };
        RestService.prototype.createHeaders = function (options) {
            var headers = {};
            if (options && options.getOptions) {
                headers["X-GET-OPTIONS"] = this.json.stringify(options.getOptions);
            }
            headers["Content-Type"] = "application/json";
            headers["Accept"] = "application/json";
            if (this.getAuthHeader) {
                Object.assign(headers, this.getAuthHeader());
            }
            return headers;
        };
        RestService.prototype.execute = function (method, url, headers, changeLoadingCount, body) {
            var _this = this;
            var client = new aurelia_fetch_client_1.HttpClient();
            if (changeLoadingCount) {
                this.loadingCount++;
            }
            return new Promise(function (success, error) {
                client
                    .fetch(url, {
                    method: method,
                    headers: headers,
                    body: body
                })
                    .then(function (r) {
                    if (r.ok) {
                        return r.text();
                    }
                    if (r.status == 401) {
                        _this.onUnauthorizated.fire({
                            url: url
                        });
                        return;
                    }
                    DevExpress.ui.notify(r.statusText, "error", 3000);
                    error(r);
                })
                    .then(function (r) { return _this.json.parse(r); })
                    .then(function (r) { return success(r); })
                    .catch(function (r) {
                    error(r);
                })
                    .then(function () {
                    if (changeLoadingCount) {
                        _this.loadingCount--;
                    }
                });
            });
        };
        return RestService;
    }());
    __decorate([
        aurelia_framework_1.computedFrom("loadingCount"),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], RestService.prototype, "isLoading", null);
    RestService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [json_service_1.JsonService,
            custom_event_1.CustomEvent])
    ], RestService);
    exports.RestService = RestService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/services/authorization-service',["require", "exports", "aurelia-framework", "./rest-service", "../../../config"], function (require, exports, aurelia_framework_1, rest_service_1, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AuthorizationService = (function () {
        function AuthorizationService(rest, aurelia, bindingEngine) {
            var _this = this;
            this.rest = rest;
            this.aurelia = aurelia;
            this.bindingEngine = bindingEngine;
            this.X_TIP_AUTH = "X-TIP-AUTH";
            this.isLoggedIn = null;
            this.bindingEngine
                .expressionObserver(this, "isLoggedIn")
                .subscribe(function (newValue, oldValue) {
                var app = "/";
                if (newValue && config_1.default["mainApp"]) {
                    app = config_1.default["mainApp"];
                }
                else if (!newValue && config_1.default["loginApp"]) {
                    app = config_1.default["loginApp"];
                }
                aurelia.setRoot(app);
            });
            this.rest.getAuthHeader = this.getAuthorizationHeaders.bind(this);
            this.rest.onUnauthorizated.register(function () {
                _this.isLoggedIn = false;
                return Promise.resolve();
            });
        }
        AuthorizationService.prototype.openApp = function () {
            var _this = this;
            if (this.isLoggedIn) {
                return;
            }
            if (!localStorage.getItem(this.X_TIP_AUTH)) {
                this.isLoggedIn = false;
                return;
            }
            this.rest.get({
                url: this.rest.getApiUrl("base/Authorization/IsLoggedIn"),
                increaseLoadingCount: true
            }).then(function (r) {
                _this.isLoggedIn = r.IsValid;
            });
        };
        AuthorizationService.prototype.login = function (data) {
            var _this = this;
            return this.rest.post({
                url: this.rest.getApiUrl("base/Authorization/Login"),
                data: data,
                increaseLoadingCount: true
            }).then(function (r) {
                if (r.IsValid) {
                    _this.isLoggedIn = true;
                    localStorage.setItem(_this.X_TIP_AUTH, r.AuthenticationToken);
                    return true;
                }
                DevExpress.ui.notify("Benutzer oder Passwort ungültig", "error", 3000);
                return false;
            });
        };
        AuthorizationService.prototype.logout = function () {
            var _this = this;
            return this.rest.get({
                url: this.rest.getApiUrl("base/Authorization/Logout"),
                increaseLoadingCount: true
            }).then(function () {
                _this.isLoggedIn = false;
                localStorage.removeItem(_this.X_TIP_AUTH);
            });
        };
        AuthorizationService.prototype.getAuthorizationHeaders = function () {
            var headers = {};
            var auth = localStorage.getItem(this.X_TIP_AUTH);
            if (auth) {
                headers[this.X_TIP_AUTH] = auth;
            }
            return headers;
        };
        return AuthorizationService;
    }());
    AuthorizationService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [rest_service_1.RestService,
            aurelia_framework_1.Aurelia,
            aurelia_framework_1.BindingEngine])
    ], AuthorizationService);
    exports.AuthorizationService = AuthorizationService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/services/binding-service',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BindingService = (function () {
        function BindingService() {
        }
        BindingService.prototype.getBindingContext = function (expression, scope) {
            var obj = expression;
            while (obj.object) {
                obj = obj.object;
            }
            if (obj.name in scope.bindingContext) {
                return scope.bindingContext;
            }
            else {
                var ov = scope.overrideContext;
                while (ov) {
                    if (obj.name in ov.bindingContext) {
                        return ov.bindingContext;
                    }
                    ov = ov.parentOverrideContext;
                }
            }
            return scope.bindingContext || scope.overrideContext;
        };
        return BindingService;
    }());
    BindingService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [])
    ], BindingService);
    exports.BindingService = BindingService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/services/data-source-service',["require", "exports", "aurelia-framework", "./rest-service"], function (require, exports, aurelia_framework_1, rest_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataSourceService = (function () {
        function DataSourceService(rest) {
            this.rest = rest;
        }
        DataSourceService.prototype.createDataSource = function (expressionProvider, options, loadRequiredAction) {
            var _this = this;
            var dataSource = new DevExpress.data.DataSource(new DevExpress.data.CustomStore({
                key: options.keyProperty,
                byKey: function (key) {
                    var getOptions = _this.createGetOptions(expressionProvider, options);
                    return _this.rest.get({
                        url: _this.rest.getWebApiUrl(options.webApiAction + "/" + key),
                        getOptions: getOptions
                    });
                },
                load: function (loadOptions) {
                    var getOptions = _this.createGetOptions(expressionProvider, options);
                    if (getOptions == null) {
                        if (loadOptions.requireTotalCount) {
                            return Promise.resolve({
                                data: [],
                                totalCount: 0
                            });
                        }
                        else {
                            return Promise.resolve([]);
                        }
                    }
                    if (loadOptions.filter) {
                        if (getOptions.where) {
                            getOptions.where = [getOptions.where, loadOptions.filter];
                        }
                        else {
                            getOptions.where = loadOptions.filter;
                        }
                    }
                    getOptions.skip = loadOptions.skip;
                    getOptions.take = loadOptions.take;
                    getOptions.requireTotalCount = loadOptions.requireTotalCount;
                    if (loadOptions.sort) {
                        getOptions.orderBy = loadOptions.sort.map(function (data) {
                            return {
                                columnName: data.selector,
                                sortOrder: (data.desc === true ? 1 : 0)
                            };
                        });
                    }
                    return _this.rest.get({
                        url: _this.rest.getWebApiUrl(options.webApiAction),
                        getOptions: getOptions
                    }).then(function (r) {
                        if (loadOptions.requireTotalCount) {
                            return {
                                data: r.rows,
                                totalCount: r.count
                            };
                        }
                        else {
                            return r;
                        }
                    });
                }
            }));
            var timeout = null;
            this.addObservers(expressionProvider, options, function () {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                timeout = setTimeout(function () {
                    if (dataSource.pageIndex() === 0) {
                        dataSource.reload();
                    }
                    else {
                        dataSource.pageIndex(0);
                    }
                    if (loadRequiredAction) {
                        loadRequiredAction();
                    }
                }, 10);
            });
            return dataSource;
        };
        DataSourceService.prototype.createGetOptions = function (expressionProvider, options) {
            var getOptions = {};
            getOptions.columns = options.webApiColumns;
            getOptions.expand = options.webApiExpand;
            getOptions.orderBy = options.webApiOrderBy;
            if (options.webApiWhere) {
                var where = [];
                if (!this.constructWhere(expressionProvider, options.webApiWhere, where)) {
                    return null;
                }
                if (where.length > 0) {
                    getOptions.where = where;
                }
            }
            if (options.filters) {
                var customs = [];
                var where = [];
                if (!this.constructFilters(expressionProvider, options, customs, where)) {
                    return null;
                }
                if (customs.length > 0) {
                    getOptions.customs = customs;
                }
                if (where.length > 0) {
                    if (getOptions.where) {
                        getOptions.where = [getOptions.where, where];
                    }
                    else {
                        getOptions.where = where;
                    }
                }
            }
            if (options.webApiMaxRecords > 0) {
                getOptions.maxRecords = options.webApiMaxRecords;
            }
            return getOptions;
        };
        DataSourceService.prototype.addObservers = function (expressionProvider, options, action) {
            this.addObserversWhere(expressionProvider, options.webApiWhere, action);
            if (options.filters) {
                for (var _i = 0, _a = options.filters; _i < _a.length; _i++) {
                    var item = _a[_i];
                    this.addObserversDetail(expressionProvider, item.if, action);
                    this.addObserversDetail(expressionProvider, item.webApiCustomValue, action);
                    this.addObserversWhere(expressionProvider, item.webApiWhere, action);
                }
            }
        };
        DataSourceService.prototype.addObserversDetail = function (expressionProvider, expression, action) {
            if (expression == void (0)) {
                return;
            }
            expressionProvider.createObserver(expression, action);
        };
        DataSourceService.prototype.addObserversWhere = function (expressionProvider, data, action) {
            var _this = this;
            if (data == void (0)) {
                return;
            }
            if (Array.isArray(data)) {
                data.forEach(function (item) { return _this.addObserversWhere(expressionProvider, item, action); });
            }
            else if (typeof data === "object") {
                if (data.isBound === true && data.expression != void (0)) {
                    this.addObserversDetail(expressionProvider, data.expression, action);
                }
                else {
                    for (var property in data) {
                        this.addObserversWhere(expressionProvider, data[property], action);
                    }
                }
            }
        };
        DataSourceService.prototype.constructWhere = function (expressionProvider, data, where) {
            var _this = this;
            if (data == void (0)) {
                return true;
            }
            if (Array.isArray(data)) {
                var newArr_1 = [];
                where.push(newArr_1);
                var cancel_1 = false;
                data.forEach(function (item) {
                    if (!_this.constructWhere(expressionProvider, item, newArr_1)) {
                        cancel_1 = true;
                    }
                });
                if (cancel_1) {
                    return false;
                }
            }
            else if (typeof data === "object") {
                if (data.isBound === true && data.expression != void (0)) {
                    var val = expressionProvider.evaluateExpression(data.expression);
                    if (val == void (0)) {
                        return false;
                    }
                    where.push(val);
                }
                else {
                    for (var property in data) {
                        if (!this.constructWhere(expressionProvider, data[property], where)) {
                            return false;
                        }
                    }
                }
            }
            else {
                where.push(data);
            }
            return true;
        };
        DataSourceService.prototype.constructFilters = function (expressionProvider, options, customs, where) {
            for (var _i = 0, _a = options.filters; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.if) {
                    if (!expressionProvider.evaluateExpression(item.if)) {
                        continue;
                    }
                }
                if (item.webApiCustomKey && item.webApiCustomValue) {
                    customs.push({
                        key: item.webApiCustomKey,
                        value: expressionProvider.evaluateExpression(item.webApiCustomValue)
                    });
                }
                else if (item.webApiWhere) {
                    var w = [];
                    if (!this.constructWhere(expressionProvider, item.webApiWhere, w)) {
                        return false;
                    }
                    where.push(w);
                }
            }
            return true;
        };
        return DataSourceService;
    }());
    DataSourceService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [rest_service_1.RestService])
    ], DataSourceService);
    exports.DataSourceService = DataSourceService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/services/deep-observer-service',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DeepObserverService = (function () {
        function DeepObserverService(bindingEngine) {
            this.bindingEngine = bindingEngine;
        }
        DeepObserverService.prototype.observe = function (target, callback) {
            var subscription = new Subscription();
            this.__observe(subscription, target, callback);
            return function () {
                subscription.dispose();
            };
        };
        DeepObserverService.prototype.__observe = function (subscription, target, callback) {
            if (target == null) {
                return;
            }
            else if (target instanceof Date) {
                return;
            }
            else if (Array.isArray(target)) {
                this.__observeArray(subscription, target, callback);
            }
            else if (typeof target === "object") {
                this.__observeObject(subscription, target, callback);
            }
        };
        DeepObserverService.prototype.__observeArray = function (subscription, target, callback) {
            var _this = this;
            var newSubscription = subscription.createChildSubscription(target);
            var observer = this.bindingEngine.collectionObserver(target).subscribe(function (e) {
                for (var _i = 0, e_1 = e; _i < e_1.length; _i++) {
                    var change = e_1[_i];
                    if (change.addedCount > 0) {
                        for (var i = change.index; i < change.addedCount; i++) {
                            _this.__observe(newSubscription, target[i], callback);
                        }
                    }
                    if (change.removed.length > 0) {
                        for (var _a = 0, _b = change.removed; _a < _b.length; _a++) {
                            var item = _b[_a];
                            newSubscription.remove(item);
                        }
                    }
                }
                callback();
            });
            for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
                var item = target_1[_i];
                this.__observe(newSubscription, item, callback);
            }
        };
        DeepObserverService.prototype.__observeObject = function (subscription, target, callback) {
            var _this = this;
            var newSubscription = subscription.createChildSubscription(target);
            for (var property in target) {
                if (target.hasOwnProperty(property)) {
                    var observer = this.bindingEngine.propertyObserver(target, property).subscribe(function (newValue, oldValue) {
                        newSubscription.remove(oldValue);
                        _this.__observe(newSubscription, newValue, callback);
                        callback();
                    });
                    newSubscription.addObserver(observer);
                    this.__observe(newSubscription, target[property], callback);
                }
            }
        };
        return DeepObserverService;
    }());
    DeepObserverService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_framework_1.BindingEngine])
    ], DeepObserverService);
    exports.DeepObserverService = DeepObserverService;
    var Subscription = (function () {
        function Subscription() {
            this.observers = [];
            this.children = new Map();
        }
        Subscription.prototype.createChildSubscription = function (child) {
            var newSubscription = new Subscription();
            this.children.set(child, newSubscription);
            return newSubscription;
        };
        Subscription.prototype.addObserver = function (observer) {
            this.observers.push(observer);
        };
        Subscription.prototype.remove = function (child) {
            var subscription = this.children.get(child);
            if (!subscription) {
                return;
            }
            subscription.dispose();
            this.children.delete(child);
        };
        Subscription.prototype.dispose = function () {
            this.observers.forEach(function (item) {
                item.dispose();
            });
            this.children.forEach(function (item) {
                item.dispose();
            });
            this.observers = [];
        };
        return Subscription;
    }());
});

define('framework/base/services/error-service',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ErrorService = (function () {
        function ErrorService() {
        }
        ErrorService.prototype.showError = function (error) {
            DevExpress.ui.dialog.alert(error, "Fehler");
        };
        ErrorService.prototype.logError = function (error) {
        };
        ErrorService.prototype.showAndLogError = function (error) {
            this.logError(error);
            this.showError(error);
        };
        return ErrorService;
    }());
    exports.ErrorService = ErrorService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/services/globalization-service',["require", "exports", "moment", "aurelia-framework"], function (require, exports, moment, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GlobalizationService = (function () {
        function GlobalizationService() {
            this.groupRegex = /\B(?=(\d{3})+(?!\d))/g;
            this.escapeRegex = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
            this.current = new GermanGlobalizationProvider();
            this.formatters = {};
            this.parsers = {};
        }
        GlobalizationService.prototype.setProvider = function (provider) {
            this.current = provider;
            this.formatters = {};
            this.parsers = {};
        };
        GlobalizationService.prototype.format = function (value, format) {
            return this.getFormatter(format)(value);
        };
        GlobalizationService.prototype.getFormatter = function (format) {
            var _this = this;
            var formatter = this.formatters[format];
            if (formatter == void (0)) {
                formatter = function (value) {
                    if (value == void (0)) {
                        return null;
                    }
                    if (format.length === 1) {
                        return moment(value).locale(_this.current.culture).format(format);
                    }
                    else {
                        var count = parseInt(format.substr(1));
                        var formatClass = format.substr(0, 1);
                        if (formatClass === "p") {
                            value = value * 100;
                        }
                        var a = value % 1;
                        var b = value - a;
                        a = Math.round(a * Math.pow(10, count));
                        if (a === 1) {
                            b += 1;
                            a = 0;
                        }
                        switch (formatClass) {
                            case "n": {
                                return "" + _this.addGroupSeparator(b) + _this.addDecimalSeparator(a, count);
                            }
                            case "f": {
                                return "" + b + _this.addDecimalSeparator(a, count);
                            }
                            case "p": {
                                return "" + _this.addGroupSeparator(b) + _this.addDecimalSeparator(a, count) + " %";
                            }
                            default: {
                                throw new Error("Not implemented format " + format);
                            }
                        }
                    }
                };
                this.formatters[format] = formatter;
            }
            return formatter;
        };
        GlobalizationService.prototype.getParser = function (format) {
            var _this = this;
            var parser = this.parsers[format];
            if (parser == void (0)) {
                parser = function (value) {
                    if (value == void (0)) {
                        return null;
                    }
                    if (format.length === 1) {
                        return moment(value, format, _this.current.culture);
                    }
                    else {
                        var groupFinder = _this.current.groupSeparator.replace(_this.escapeRegex, "\\$&");
                        value = value
                            .replace(new RegExp(groupFinder, "g"), "")
                            .replace(new RegExp("%", "g"), "")
                            .replace(new RegExp(" ", "g"), "");
                        var indexOf = value.indexOf(_this.current.commaSeparator);
                        var b = value;
                        var a = "";
                        if (indexOf >= 0) {
                            b = value.substr(0, indexOf);
                            a = value.substr(indexOf + 1);
                        }
                        var count = parseInt(format.substr(1));
                        var formatClass = format.substr(0, 1);
                        switch (formatClass) {
                            case "f":
                            case "n": {
                                return parseInt(b) + _this.makeComma(a);
                            }
                            case "p": {
                                return (parseInt(b) + _this.makeComma(a)) / 100;
                            }
                            default: {
                                throw new Error("Not implemented format " + format);
                            }
                        }
                    }
                };
                this.parsers[format] = parser;
            }
            return parser;
        };
        GlobalizationService.prototype.getFormatterParser = function (format) {
            return {
                formatter: this.getFormatter(format),
                parser: this.getParser(format)
            };
        };
        GlobalizationService.prototype.addGroupSeparator = function (value) {
            return value.toString().replace(this.groupRegex, this.current.groupSeparator);
        };
        GlobalizationService.prototype.addDecimalSeparator = function (value, count) {
            var r = "";
            if (count > 0) {
                r += this.current.commaSeparator;
                var c = value.toString();
                while (c.length < count) {
                    c += "0";
                }
                r += c;
            }
            return r;
        };
        GlobalizationService.prototype.makeComma = function (value) {
            return parseInt(value) / Math.pow(10, value.length);
        };
        return GlobalizationService;
    }());
    GlobalizationService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [])
    ], GlobalizationService);
    exports.GlobalizationService = GlobalizationService;
    var GermanGlobalizationProvider = (function () {
        function GermanGlobalizationProvider() {
            this.culture = "de";
            this.d = "DD.MM.YYYY";
            this.D = "dddd, DD. MMM YYYY";
            this.f = "dddd, DD. MMM YYYY, HH:mm";
            this.F = "dddd, DD. MMM yyyy, HH:mm:ss";
            this.g = "DD.MM.YYYY HH:mm";
            this.G = "DD.MM.YYYY HH:mm:ss";
            this.t = "HH:mm";
            this.T = "HH:mm:ss";
            this.commaSeparator = ",";
            this.groupSeparator = " ";
        }
        return GermanGlobalizationProvider;
    }());
    exports.GermanGlobalizationProvider = GermanGlobalizationProvider;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/services/localization-service',["require", "exports", "aurelia-framework", "./rest-service", "text!../../../localization-neutral.json"], function (require, exports, aurelia_framework_1, rest_service_1, localizationNeutral) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LocalizationService = (function () {
        function LocalizationService(rest) {
            this.rest = rest;
            this.neutral = JSON.parse(localizationNeutral);
        }
        LocalizationService.prototype.translate = function (expressionProvider, key, callback) {
            var _this = this;
            if (!key) {
                return null;
            }
            var item = this.getItem(key);
            if (!item) {
                throw new Error("No localization found for " + key);
            }
            if (callback) {
                if (!Array.isArray(expressionProvider) && typeof item === "object" && item.parameters.length > 0) {
                    item.parameters.forEach(function (expr, index) {
                        expressionProvider.createObserver(expr, function () {
                            callback(_this.translateItem(expressionProvider, item));
                        });
                    });
                }
                var result = this.translateItem(expressionProvider, item);
                callback(result);
                return result;
            }
            else {
                return this.translateItem(expressionProvider, item);
            }
        };
        LocalizationService.prototype.getItem = function (key) {
            var items = key.split(".");
            var item = this.neutral;
            items.forEach(function (i) {
                if (!item) {
                    return;
                }
                item = item[i];
            });
            return item;
        };
        LocalizationService.prototype.translateItem = function (expressionProvider, item) {
            if (typeof item === "string") {
                if (Array.isArray(expressionProvider)) {
                    expressionProvider.forEach(function (val, index) {
                        item = item.replace(new RegExp("\\{" + index + "\\}", "g"), val);
                    });
                }
                return item;
            }
            else if (!Array.isArray(expressionProvider) && typeof item === "object") {
                var text_1 = item.text;
                item.parameters.forEach(function (expr, index) {
                    var val = expressionProvider.evaluateExpression(expr);
                    if (val == void (0)) {
                        val = "";
                    }
                    text_1 = text_1.replace(new RegExp("\\{" + index + "\\}", "g"), val);
                });
                return text_1;
            }
            throw new Error();
        };
        return LocalizationService;
    }());
    LocalizationService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [rest_service_1.RestService])
    ], LocalizationService);
    exports.LocalizationService = LocalizationService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/services/location-service',["require", "exports", "aurelia-framework", "../classes/custom-event"], function (require, exports, aurelia_framework_1, custom_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LocationService = (function () {
        function LocationService(onLocationGoTo) {
            this.onLocationGoTo = onLocationGoTo;
        }
        LocationService.prototype.goTo = function (url, currentViewModel) {
            var args = {
                url: url,
                currentViewModel: currentViewModel,
                isHandled: false
            };
            this.onLocationGoTo
                .fire(args)
                .then(function () {
                if (!args.isHandled) {
                    location.assign(url);
                }
            });
        };
        return LocationService;
    }());
    LocationService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [custom_event_1.CustomEvent])
    ], LocationService);
    exports.LocationService = LocationService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('framework/base/services/permission-service',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PermissionService = (function () {
        function PermissionService() {
        }
        PermissionService.prototype.canWebApiNew = function (webApiAction) {
            return true;
        };
        PermissionService.prototype.canWebApiModify = function (webApiAction) {
            return true;
        };
        PermissionService.prototype.canWebApiDelete = function (webApiAction) {
            return true;
        };
        return PermissionService;
    }());
    PermissionService = __decorate([
        aurelia_framework_1.autoinject
    ], PermissionService);
    exports.PermissionService = PermissionService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/services/shortcut-service',["require", "exports", "aurelia-framework", "../classes/export", "../enumerations/export", "mousetrap"], function (require, exports, aurelia_framework_1, export_1, export_2, mousetrap) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ShortcutService = (function () {
        function ShortcutService(onShortcutExecute) {
            this.onShortcutExecute = onShortcutExecute;
            this.bind();
        }
        ShortcutService.prototype.bind = function () {
            var _this = this;
            mousetrap.bindGlobal("f10", function (e) { return _this.fire(export_2.Shortcuts.save); });
            mousetrap.bindGlobal("ctrl+f10", function (e) { return _this.fire(export_2.Shortcuts.saveAndNew); });
            mousetrap.bindGlobal("f8", function (e) { return _this.fire(export_2.Shortcuts.delete); });
            mousetrap.bindGlobal("f7", function (e) { return _this.fire(export_2.Shortcuts.new); });
        };
        ShortcutService.prototype.fire = function (shortcut) {
            if (document.activeElement) {
                var activeElement = document.activeElement;
                if (activeElement.blur) {
                    activeElement.blur();
                }
            }
            this.onShortcutExecute.fire({
                shortcut: shortcut
            });
        };
        return ShortcutService;
    }());
    ShortcutService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [export_1.CustomEvent])
    ], ShortcutService);
    exports.ShortcutService = ShortcutService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/services/style-service',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StyleService = (function () {
        function StyleService() {
        }
        StyleService.prototype.addStyles = function (key, styleClasses) {
            this.removeStyleTag(key);
            var styleTag = document.createElement('style');
            styleTag.type = "text/css";
            styleTag.id = key;
            styleTag.appendChild(document.createTextNode(this.getCssClasses(styleClasses)));
            document.head.appendChild(styleTag);
        };
        StyleService.prototype.removeStyleTag = function (key) {
            var styleTag = document.getElementById(key);
            if (styleTag) {
                styleTag.remove();
            }
        };
        StyleService.prototype.getCssClasses = function (styleClasses) {
            var _this = this;
            return styleClasses
                .map(function (c) { return "\n" + c.name + " {\n " + _this.getCssClass(c.properties) + " }\n"; })
                .join("");
        };
        StyleService.prototype.getCssClass = function (properties) {
            return properties
                .map(function (c) { return c.propertyName + ": " + c.value + ";\n"; })
                .join("");
        };
        return StyleService;
    }());
    StyleService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [])
    ], StyleService);
    exports.StyleService = StyleService;
});

define('framework/base/services/export',["require", "exports", "./authorization-service", "./binding-service", "./data-source-service", "./deep-observer-service", "./error-service", "./globalization-service", "./localization-service", "./location-service", "./json-service", "./object-info-service", "./permission-service", "./rest-service", "./shortcut-service", "./style-service"], function (require, exports, authorization_service_1, binding_service_1, data_source_service_1, deep_observer_service_1, error_service_1, globalization_service_1, localization_service_1, location_service_1, json_service_1, object_info_service_1, permission_service_1, rest_service_1, shortcut_service_1, style_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthorizationService = authorization_service_1.AuthorizationService;
    exports.BindingService = binding_service_1.BindingService;
    exports.DataSourceService = data_source_service_1.DataSourceService;
    exports.DeepObserverService = deep_observer_service_1.DeepObserverService;
    exports.ErrorService = error_service_1.ErrorService;
    exports.GlobalizationService = globalization_service_1.GlobalizationService;
    exports.LocalizationService = localization_service_1.LocalizationService;
    exports.LocationService = location_service_1.LocationService;
    exports.JsonService = json_service_1.JsonService;
    exports.ObjectInfoService = object_info_service_1.ObjectInfoService;
    exports.PermissionService = permission_service_1.PermissionService;
    exports.RestService = rest_service_1.RestService;
    exports.ShortcutService = shortcut_service_1.ShortcutService;
    exports.StyleService = style_service_1.StyleService;
});

define('framework/base/export',["require", "exports", "./classes/export", "./services/export"], function (require, exports, export_1, export_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(export_1);
    __export(export_2);
});

define('framework/base/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config
            .globalResources("./attributes/icon/fa-icon-attribute")
            .globalResources("./attributes/translation/translation-attribute")
            .globalResources("./styles/styles.css");
    }
    exports.configure = configure;
});

define('resources/models/column-info',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('resources/models/database-provider',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('resources/models/database-repository',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('resources/models/table',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('resources/models/table-data',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('resources/models/export',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/services/database-service',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../framework/base/services/export", "../event-aggregator-constants"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, export_1, EAConstants) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DatabaseService = (function () {
        function DatabaseService(rest, eventAggregator) {
            this.rest = rest;
            this.eventAggregator = eventAggregator;
            this.getDatabases();
            this._tables = {};
        }
        DatabaseService.prototype.getDatabases = function () {
            var _this = this;
            if (this.databases) {
                return Promise.resolve(this.databases);
            }
            return this
                .get("Database/Databases")
                .then(function (r) {
                _this.databases = r;
                return r;
            });
        };
        DatabaseService.prototype.getTables = function (databaseId) {
            var _this = this;
            if (this._tables[databaseId]) {
                return Promise.resolve(this._tables[databaseId]);
            }
            return this
                .get("Database/Tables?databaseId=" + databaseId)
                .then(function (r) {
                _this._tables[databaseId] = r;
                return r;
            });
        };
        DatabaseService.prototype.deleteDatabase = function (database) {
            var index = this.databases.indexOf(database);
            if (index >= 0) {
                this.databases.splice(index, 1);
            }
            if (!database.id) {
                return Promise.resolve();
            }
            this.eventAggregator.publish(EAConstants.DATABASE_REMOVED, database.id);
            return this.post("Database/DeleteDatabase", {
                id: database.id
            });
        };
        DatabaseService.prototype.postDatabase = function (database) {
            return this.post("Database/Database", database)
                .then(function (r) {
                Object.assign(database, r);
            });
        };
        DatabaseService.prototype.reload = function () {
            this.databases = null;
            return this.getDatabases();
        };
        DatabaseService.prototype.getProviders = function () {
            return this
                .get("Database/Providers")
                .then(function (r) {
                return r;
            });
        };
        DatabaseService.prototype.get = function (url) {
            return this.rest
                .get({
                url: this.rest.getApiUrl(url)
            });
        };
        DatabaseService.prototype.post = function (url, data) {
            return this.rest
                .post({
                url: this.rest.getApiUrl(url),
                data: data
            });
        };
        return DatabaseService;
    }());
    DatabaseService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [export_1.RestService,
            aurelia_event_aggregator_1.EventAggregator])
    ], DatabaseService);
    exports.DatabaseService = DatabaseService;
});

define('resources/elements/table/table-notification',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/editor/editor',["require", "exports", "aurelia-framework", "../../models/export"], function (require, exports, aurelia_framework_1, Models) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Editor = (function () {
        function Editor(element) {
            this.element = element;
        }
        Editor.prototype.attached = function () {
            this.instance = monaco.editor.create(this.element, {
                language: this.language || "sql",
                automaticLayout: true,
                wordWrap: true
            });
        };
        Editor.prototype.insertText = function (text) {
            var sel = this.instance.getSelection();
            this.instance.executeEdits("text-placeholder", [{
                    identifier: { major: 1, minor: 0 },
                    range: sel,
                    text: text,
                    forceMoveMarkers: true
                }]);
            this.instance.focus();
        };
        Editor.prototype.setScriptToData = function () {
            this.tableData.script = this.getValue();
        };
        Editor.prototype.refresh = function () {
            this.setValue(this.tableData.script);
        };
        Editor.prototype.getValue = function () {
            return this.instance.getValue();
        };
        Editor.prototype.setValue = function (value) {
            this.instance.setValue(value || "");
        };
        return Editor;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Editor.prototype, "tableData", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Editor.prototype, "language", void 0);
    Editor = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Element])
    ], Editor);
    exports.Editor = Editor;
});

define('resources/elements/table-selection/table-selection-notification',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/table-information/table-information',["require", "exports", "aurelia-framework", "../../services/export"], function (require, exports, aurelia_framework_1, Services) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableInformation = (function () {
        function TableInformation(sql) {
            var _this = this;
            this.sql = sql;
            this.tableInfoPopupOptions = {
                contentTemplate: "contentTemplate",
                showCloseButton: false,
                toolbarItems: [{
                        text: "Tabelleninformation",
                        location: "center"
                    }, {
                        widget: "dxButton",
                        location: "after",
                        options: {
                            hint: "Schließen",
                            icon: "fa fa-times",
                            onClick: function () {
                                _this.tableInfoPopupVisible = false;
                            }
                        }
                    }],
                onShown: function (e) {
                },
                bindingOptions: {
                    "visible": "tableInfoPopupVisible"
                }
            };
            this.tableInfoGridOptions = {
                columns: [{
                        dataField: "columnName",
                        caption: "Spalte"
                    }, {
                        dataField: "typeName",
                        caption: "Typ"
                    }, {
                        dataField: "maxLength",
                        caption: "Max. Länge",
                        width: "100px"
                    }, {
                        dataField: "isNullable",
                        caption: "Null?",
                        width: "100px"
                    }, {
                        dataField: "relatedTableName",
                        caption: "FK Tabelle"
                    }, {
                        dataField: "relatedColumnName",
                        caption: "FK Spalte"
                    }],
                height: "100%",
                bindingOptions: {
                    "dataSource": "tableInfo.columns"
                }
            };
        }
        TableInformation.prototype.show = function (databaseId, tableName) {
            var _this = this;
            this.sql
                .tableInfo(databaseId, tableName)
                .then(function (r) {
                _this.tableInfo = r;
            });
            this.tableInfoPopupVisible = true;
        };
        return TableInformation;
    }());
    TableInformation = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Services.SqlService])
    ], TableInformation);
    exports.TableInformation = TableInformation;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/table-selection/table-selection',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../table-information/table-information", "../../services/export", "../../event-aggregator-constants"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, table_information_1, Services, EAConstants) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableSelection = (function () {
        function TableSelection(database, sql, eventAggregator) {
            var _this = this;
            this.database = database;
            this.sql = sql;
            this.eventAggregator = eventAggregator;
            this.databaseOptions = {
                valueExpr: "id",
                displayExpr: "caption",
                bindingOptions: {
                    value: "databaseId",
                    dataSource: "database.databases",
                    disabled: "databaseDisabled"
                }
            };
            this.tableOptions = {
                searchPanel: {
                    visible: true
                },
                hoverStateEnabled: true,
                scrolling: {
                    mode: "virtual",
                    preloadEnabled: true
                },
                columns: [{
                        dataField: "tableName",
                        caption: "Tabelle"
                    }],
                showColumnHeaders: false,
                bindingOptions: {
                    dataSource: "tables"
                },
                height: "100%",
                onContextMenuPreparing: function (e) {
                    if (e.row.rowType === "data") {
                        e.items = [{
                                text: "Tabelle erstellen",
                                onItemClick: function () {
                                    if (!_this.notification) {
                                        return;
                                    }
                                    _this.notification.onTableClicked(_this.databaseId, e.row.data.tableName);
                                }
                            },
                            {
                                text: "Tabelle mit Alias erstellen",
                                onItemClick: function () {
                                    if (!_this.notification) {
                                        return;
                                    }
                                    _this.notification.onTableClicked(_this.databaseId, e.row.data.tableName, "a");
                                }
                            },
                            {
                                text: "Tabelleninformation anzeigen",
                                beginGroup: true,
                                onItemClick: function () {
                                    _this.tableInformationViewModel.show(_this.databaseId, e.row.data.tableName);
                                }
                            }];
                    }
                },
                onRowClick: function (e) {
                    if (!_this.notification) {
                        return;
                    }
                    _this.notification.onTableClicked(_this.databaseId, e.data.tableName);
                },
                onToolbarPreparing: function (e) {
                    var dataGrid = e.component;
                    e.toolbarOptions.items.unshift({
                        location: "before",
                        text: "Tabellen"
                    });
                }
            };
        }
        Object.defineProperty(TableSelection.prototype, "databaseDisabled", {
            get: function () {
                return !this.database
                    || !this.database.databases;
            },
            enumerable: true,
            configurable: true
        });
        TableSelection.prototype.attached = function () {
            var _this = this;
            this.databaseRemovedSubscription = this.eventAggregator.subscribe(EAConstants.DATABASE_REMOVED, function (e) {
                if (_this.databaseId == e) {
                    _this.databaseId = null;
                }
            });
        };
        TableSelection.prototype.detached = function () {
            this.databaseRemovedSubscription.dispose();
        };
        TableSelection.prototype.databaseIdChanged = function (newValue, oldValue) {
            var _this = this;
            if (newValue) {
                this.database.getTables(newValue).then(function (r) {
                    _this.tables = r;
                });
            }
            else {
                this.tables = [];
            }
        };
        return TableSelection;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], TableSelection.prototype, "notification", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", table_information_1.TableInformation)
    ], TableSelection.prototype, "tableInformationViewModel", void 0);
    __decorate([
        aurelia_framework_1.observable,
        __metadata("design:type", Number)
    ], TableSelection.prototype, "databaseId", void 0);
    __decorate([
        aurelia_framework_1.computedFrom("database", "database.databases"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TableSelection.prototype, "databaseDisabled", null);
    TableSelection = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Services.DatabaseService, Services.SqlService, aurelia_event_aggregator_1.EventAggregator])
    ], TableSelection);
    exports.TableSelection = TableSelection;
});

define('resources/elements/column-chooser/column-chooser-notification',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/column-chooser/column-chooser',["require", "exports", "aurelia-framework", "../../services/export"], function (require, exports, aurelia_framework_1, Services) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColumnChooser = (function () {
        function ColumnChooser(table) {
            var _this = this;
            this.table = table;
            this.tableSelectOptions = {
                displayExpr: "caption",
                valueExpr: "tableData.tableId",
                bindingOptions: {
                    "dataSource": "table.tables",
                    "value": "selectedTableId",
                    "disabled": "tableSelectDisabled"
                }
            };
            this.columnGridOptions = {
                searchPanel: {
                    visible: true
                },
                hoverStateEnabled: true,
                scrolling: {
                    mode: "virtual",
                    preloadEnabled: true
                },
                columns: [{
                        dataField: "caption",
                        caption: "Spalte",
                        sortIndex: 0,
                        sortOrder: "asc"
                    }],
                showColumnHeaders: false,
                height: "100%",
                onRowClick: function (e) {
                    if (!_this.notification) {
                        return;
                    }
                    _this.notification.onColumnClicked(e.data.caption);
                },
                onToolbarPreparing: function (e) {
                    var dataGrid = e.component;
                    e.toolbarOptions.items.unshift({
                        location: "before",
                        text: "Spalten"
                    });
                },
                bindingOptions: {
                    dataSource: "columns"
                }
            };
        }
        ColumnChooser.prototype.fixedTableIdChanged = function (newValue, oldValue) {
            this.tableSelectDisabled = !!newValue;
            if (newValue) {
                this.selectedTableId = newValue;
            }
            else {
                this.selectedTableId = null;
            }
        };
        ColumnChooser.prototype.selectedTableIdChanged = function (newValue, oldValue) {
            if (newValue) {
                this.columns = this.table.getTableDataByTableId(newValue).columns;
            }
            else {
                this.columns = [];
            }
        };
        return ColumnChooser;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], ColumnChooser.prototype, "notification", void 0);
    __decorate([
        aurelia_framework_1.bindable, aurelia_framework_1.observable,
        __metadata("design:type", Number)
    ], ColumnChooser.prototype, "fixedTableId", void 0);
    __decorate([
        aurelia_framework_1.bindable, aurelia_framework_1.observable,
        __metadata("design:type", Number)
    ], ColumnChooser.prototype, "selectedTableId", void 0);
    ColumnChooser = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Services.TableService])
    ], ColumnChooser);
    exports.ColumnChooser = ColumnChooser;
});

define('resources/elements/statement-editor/statement-editor-notification',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/statement-editor/statement-editor',["require", "exports", "aurelia-framework", "../editor/editor", "../table-selection/table-selection", "../column-chooser/column-chooser", "../../models/export", "../../services/export"], function (require, exports, aurelia_framework_1, editor_1, table_selection_1, column_chooser_1, Models, Services) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StatementEditor = (function () {
        function StatementEditor(sql, table) {
            var _this = this;
            this.sql = sql;
            this.table = table;
            this.tableSelectionNotification = {
                onTableClicked: this.onTableClicked.bind(this)
            };
            this.columnChooserNotification = {
                onColumnClicked: this.onColumnChooserColumnClicked.bind(this)
            };
            this.statementPopupOptions = {
                contentTemplate: "contentTemplate",
                showCloseButton: false,
                toolbarItems: [{
                        widget: "dxButton",
                        location: "before",
                        options: {
                            hint: "Statement ausführen",
                            icon: "fa fa-play",
                            onClick: function () {
                                _this.editorViewModel.setScriptToData();
                                _this.editorData.databaseId = _this.tableSelectionViewModel.databaseId;
                                _this.editorData.rows = _this.getMaxRows();
                                if (_this.columnChooserViewModel.selectedTableId) {
                                    _this.tableData.referencedTableDataId = _this.columnChooserViewModel.selectedTableId;
                                }
                                else {
                                    _this.tableData.referencedTableDataId = null;
                                }
                                if (_this.notification) {
                                    _this.notification.onExecute();
                                }
                                _this.statementPopupVisible = false;
                            }
                        },
                    }, {
                        widget: "dxButton",
                        location: "before",
                        options: {
                            hint: "Statement formatieren",
                            icon: "fa fa-align-left",
                            onClick: function () {
                                _this.sql.formatSql(_this.editorViewModel.getValue())
                                    .then(function (r) {
                                    _this.editorViewModel.setValue(r.script);
                                });
                            }
                        },
                    }, {
                        text: "Statement editieren",
                        location: "center"
                    }, {
                        widget: "dxNumberBox",
                        location: "after",
                        options: {
                            hint: "Anzahl zu lesende Datensätze",
                            min: -1,
                            showSpinButtons: true,
                            onInitialized: function (e) {
                                _this.maxRowsNumberBox = e.component;
                            }
                        },
                    }, {
                        widget: "dxButton",
                        location: "after",
                        options: {
                            hint: "Schließen",
                            icon: "fa fa-times",
                            onClick: function () {
                                _this.statementPopupVisible = false;
                            }
                        }
                    }],
                onShown: function (e) {
                    _this.setMaxRows(_this.editorData.rows);
                    _this.tableSelectionViewModel.databaseId = _this.editorData.databaseId;
                    if (_this.tableData.referencedTableData) {
                        _this.columnChooserViewModel.selectedTableId = _this.tableData.referencedTableData.tableId;
                    }
                    else {
                        _this.columnChooserViewModel.selectedTableId = _this.fixedTableId;
                    }
                    _this.editorViewModel.refresh();
                },
                bindingOptions: {
                    "visible": "statementPopupVisible"
                }
            };
        }
        StatementEditor.prototype.show = function () {
            if (this.tableData == this.editorData) {
                this.fixedTableId = null;
            }
            else {
                this.fixedTableId = this.tableData.tableId;
            }
            this.statementPopupVisible = true;
        };
        StatementEditor.prototype.getMaxRows = function () {
            return this.maxRowsNumberBox.option("value");
        };
        StatementEditor.prototype.setMaxRows = function (value) {
            this.maxRowsNumberBox.option("value", value);
        };
        StatementEditor.prototype.onColumnChooserColumnClicked = function (columnName) {
            this.editorViewModel.insertText("<#" + columnName + "#>");
        };
        StatementEditor.prototype.onTableClicked = function (databaseId, tableName, alias) {
            var _this = this;
            var tableData = {
                databaseId: databaseId,
                tableName: tableName,
                alias: alias,
                tableId: new Date().getTime()
            };
            this.sql
                .selectSql(tableData)
                .then(function (r) {
                _this.editorViewModel.setValue(r.tableData.script);
            });
        };
        return StatementEditor;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], StatementEditor.prototype, "editorData", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], StatementEditor.prototype, "tableData", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], StatementEditor.prototype, "notification", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", table_selection_1.TableSelection)
    ], StatementEditor.prototype, "tableSelectionViewModel", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", editor_1.Editor)
    ], StatementEditor.prototype, "editorViewModel", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", column_chooser_1.ColumnChooser)
    ], StatementEditor.prototype, "columnChooserViewModel", void 0);
    StatementEditor = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Services.SqlService, Services.TableService])
    ], StatementEditor);
    exports.StatementEditor = StatementEditor;
});

define('resources/elements/find-column/find-column-notification',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/find-column/find-column',["require", "exports", "aurelia-framework", "../../models/export"], function (require, exports, aurelia_framework_1, Models) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FindColumn = (function () {
        function FindColumn() {
            var _this = this;
            this.findColumnPopupOptions = {
                contentTemplate: "contentTemplate",
                showCloseButton: false,
                width: "400px",
                height: "auto",
                toolbarItems: [{
                        widget: "dxButton",
                        location: "before",
                        options: {
                            hint: "Spalte markieren",
                            icon: "fa fa-play",
                            onClick: function () {
                                if (!_this.notification) {
                                    return;
                                }
                                _this.notification.onColumnSelected(_this.selectedInternalFieldName);
                                _this.findColumnPopupVisible = false;
                            }
                        },
                    }, {
                        text: "Spalte suchen",
                        location: "center"
                    }, {
                        widget: "dxButton",
                        location: "after",
                        options: {
                            hint: "Schließen",
                            icon: "fa fa-times",
                            onClick: function () {
                                _this.findColumnPopupVisible = false;
                            }
                        }
                    }],
                onShown: function (e) {
                },
                bindingOptions: {
                    "visible": "findColumnPopupVisible"
                }
            };
            this.columnSelectDataOptions = {
                displayExpr: "caption",
                valueExpr: "internalFieldName",
                width: "100%",
                bindingOptions: {
                    "dataSource": "tableData.columns",
                    "value": "selectedInternalFieldName"
                }
            };
        }
        FindColumn.prototype.show = function () {
            this.findColumnPopupVisible = true;
        };
        return FindColumn;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], FindColumn.prototype, "notification", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], FindColumn.prototype, "tableData", void 0);
    FindColumn = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [])
    ], FindColumn);
    exports.FindColumn = FindColumn;
});

define('resources/elements/change-data/change-data-notification',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('resources/elements/code-editor/code-editor-notification',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/code-editor/code-editor',["require", "exports", "aurelia-framework", "../editor/editor", "../column-chooser/column-chooser", "../../models/export", "../../services/export"], function (require, exports, aurelia_framework_1, editor_1, column_chooser_1, Models, Services) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CodeEditor = (function () {
        function CodeEditor(table) {
            var _this = this;
            this.table = table;
            this.columnChooserNotification = {
                onColumnClicked: this.onColumnChooserColumnClicked.bind(this)
            };
            this.codePopupOptions = {
                contentTemplate: "contentTemplate",
                showCloseButton: false,
                toolbarItems: [{
                        widget: "dxButton",
                        location: "before",
                        options: {
                            hint: "Code ausführen",
                            icon: "fa fa-play",
                            onClick: function () {
                                _this.editorViewModel.setScriptToData();
                                if (_this.columnChooserViewModel.selectedTableId) {
                                    _this.tableData.referencedTableDataId = _this.columnChooserViewModel.selectedTableId;
                                }
                                else {
                                    _this.tableData.referencedTableDataId = null;
                                }
                                if (_this.notification) {
                                    _this.notification.onExecute();
                                }
                                _this.codePopupVisible = false;
                            }
                        },
                    }, {
                        text: "Code editieren",
                        location: "center"
                    }, {
                        widget: "dxButton",
                        location: "after",
                        options: {
                            hint: "Schließen",
                            icon: "fa fa-times",
                            onClick: function () {
                                _this.codePopupVisible = false;
                            }
                        }
                    }],
                onShown: function (e) {
                    if (_this.tableData.referencedTableData) {
                        _this.columnChooserViewModel.selectedTableId = _this.tableData.referencedTableData.tableId;
                    }
                    else {
                        _this.columnChooserViewModel.selectedTableId = _this.fixedTableId;
                    }
                    _this.editorViewModel.refresh();
                },
                bindingOptions: {
                    "visible": "codePopupVisible"
                }
            };
        }
        CodeEditor.prototype.show = function () {
            if (this.tableData == this.editorData) {
                this.fixedTableId = null;
            }
            else {
                this.fixedTableId = this.tableData.tableId;
            }
            this.codePopupVisible = true;
        };
        CodeEditor.prototype.onColumnChooserColumnClicked = function (columnName) {
            this.editorViewModel.insertText("eval.GetValue('" + columnName + "')");
        };
        return CodeEditor;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], CodeEditor.prototype, "tableData", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], CodeEditor.prototype, "editorData", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], CodeEditor.prototype, "notification", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", editor_1.Editor)
    ], CodeEditor.prototype, "editorViewModel", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", column_chooser_1.ColumnChooser)
    ], CodeEditor.prototype, "columnChooserViewModel", void 0);
    CodeEditor = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Services.TableService])
    ], CodeEditor);
    exports.CodeEditor = CodeEditor;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/change-data/change-data',["require", "exports", "aurelia-framework", "../statement-editor/statement-editor", "../code-editor/code-editor", "../../models/export", "../../services/export"], function (require, exports, aurelia_framework_1, statement_editor_1, code_editor_1, Models, Services) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChangeData = (function () {
        function ChangeData(sql) {
            var _this = this;
            this.sql = sql;
            this.statementEditorNotification = {
                onExecute: this.onStatementEditorExecute.bind(this)
            };
            this.codeEditorNotification = {
                onExecute: this.onCodeEditorExecute.bind(this)
            };
            this.changeDataPopupOptions = {
                contentTemplate: "contentTemplate",
                showCloseButton: false,
                width: "800px",
                toolbarItems: [{
                        widget: "dxButton",
                        location: "before",
                        options: {
                            hint: "Änderungen ausführen",
                            icon: "fa fa-play",
                            onClick: function () {
                                _this.sql
                                    .executeChanges(_this.tableData)
                                    .then(function (r) {
                                    if (_this.notification) {
                                        _this.notification.onDataChanged(r.data);
                                    }
                                    _this.changeDataPopupVisible = false;
                                });
                            }
                        },
                    }, {
                        widget: "dxButton",
                        location: "before",
                        options: {
                            hint: "SQL",
                            icon: "fa fa-database",
                            onClick: function () {
                                _this.tableData.changeData.push({
                                    type: "sql",
                                    databaseId: _this.tableData.databaseId
                                });
                            }
                        },
                    }, {
                        widget: "dxButton",
                        location: "before",
                        options: {
                            hint: "Text",
                            icon: "fa fa-font",
                            onClick: function () {
                                _this.tableData.changeData.push({
                                    type: "text"
                                });
                            }
                        },
                    }, {
                        widget: "dxButton",
                        location: "before",
                        options: {
                            hint: "Laufende Nummer",
                            icon: "fa fa-list-ol",
                            onClick: function () {
                                _this.tableData.changeData.push({
                                    type: "running"
                                });
                            }
                        },
                    }, {
                        widget: "dxButton",
                        location: "before",
                        options: {
                            hint: "Skript",
                            icon: "fa fa-code",
                            onClick: function () {
                                _this.tableData.changeData.push({
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
                        options: {
                            hint: "Schließen",
                            icon: "fa fa-times",
                            onClick: function () {
                                _this.changeDataPopupVisible = false;
                            }
                        }
                    }],
                onShown: function (e) {
                },
                bindingOptions: {
                    "visible": "changeDataPopupVisible"
                }
            };
            this.columnChangeDataOptions = {
                displayExpr: "caption",
                valueExpr: "internalFieldName",
                width: "300px",
                bindingOptions: {
                    "dataSource": "tableData.columns",
                    "value": "changeDataItem.internalFieldName"
                }
            };
            this.sqlChangeDataOptions = {
                text: "SQL editieren",
                width: "150px",
                onClick: function (e) {
                    _this.statementEditorViewModel.editorData = e.model.changeDataItem;
                    _this.statementEditorViewModel.show();
                }
            };
            this.textChangeDataOptions = {
                width: "150px",
                bindingOptions: {
                    "value": "changeDataItem.text"
                }
            };
            this.runningChangeDataOptions = {
                width: "150px",
                bindingOptions: {
                    "value": "changeDataItem.running"
                }
            };
            this.codeChangeDataOptions = {
                width: "150px",
                text: "Code editieren",
                onClick: function (e) {
                    _this.codeEditorViewModel.editorData = e.model.changeDataItem;
                    _this.codeEditorViewModel.show();
                }
            };
            this.deleteChangeDataOptions = {
                text: "Entfernen",
                icon: "fa fa-trash-o",
                onClick: function (e) {
                    var index = _this.tableData.changeData.indexOf(e.model.changeDataItem);
                    if (index < 0) {
                        return;
                    }
                    _this.tableData.changeData.splice(index, 1);
                }
            };
        }
        ChangeData.prototype.show = function () {
            this.changeDataPopupVisible = true;
        };
        ChangeData.prototype.onStatementEditorExecute = function () {
        };
        ChangeData.prototype.onCodeEditorExecute = function () {
        };
        return ChangeData;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], ChangeData.prototype, "notification", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], ChangeData.prototype, "tableData", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], ChangeData.prototype, "dataSource", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", statement_editor_1.StatementEditor)
    ], ChangeData.prototype, "statementEditorViewModel", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", code_editor_1.CodeEditor)
    ], ChangeData.prototype, "codeEditorViewModel", void 0);
    ChangeData = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Services.SqlService])
    ], ChangeData);
    exports.ChangeData = ChangeData;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/table/table',["require", "exports", "aurelia-framework", "../statement-editor/statement-editor", "../find-column/find-column", "../change-data/change-data", "../../models/export", "../../services/export"], function (require, exports, aurelia_framework_1, statement_editor_1, find_column_1, change_data_1, Models, Services) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Table = (function () {
        function Table(sql, table, taskQueue) {
            var _this = this;
            this.sql = sql;
            this.table = table;
            this.taskQueue = taskQueue;
            this._isTableInNewMode = false;
            this.statementEditorNotification = {
                onExecute: this.loadData.bind(this)
            };
            this.changeDataNotification = {
                onDataChanged: this.setGridData.bind(this)
            };
            this.findColumnNotification = {
                onColumnSelected: this.onColumnSelected.bind(this)
            };
            this.tableOptions = {
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
                onContextMenuPreparing: function (e) {
                    if (e.row.rowType === "data") {
                        var column_1 = e.column;
                        var data_1 = e.row.data;
                        var columnInfo_1 = _this.tableData.columns.find(function (c) { return c.internalFieldName == column_1.dataField; });
                        if (!columnInfo_1 || !columnInfo_1.relatedTableName || !columnInfo_1.relatedColumnName) {
                            return;
                        }
                        if (data_1[column_1.dataField] == void (0)) {
                            return;
                        }
                        e.items = [{
                                text: "Verknüpften Datensatz öffnen",
                                onItemClick: function () {
                                    if (!_this.notification) {
                                        return;
                                    }
                                    _this.notification.onRelationClicked(_this.tableData.databaseId, columnInfo_1.relatedTableName, columnInfo_1.relatedColumnName, data_1[column_1.dataField]);
                                }
                            }];
                    }
                },
                onRowPrepared: function (e) {
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
                onRowInserted: function (e) {
                    e.key._state = 2;
                    _this._isTableInNewMode = false;
                    _this.hasChanges = true;
                    var grid = _this.tableViewModel.instance;
                    grid.option("editing.mode", "cell");
                    grid.repaint();
                },
                onRowUpdated: function (e) {
                    if (e.key._state === undefined || e.key._state === 0) {
                        e.key._state = 1;
                        if (!e.key._changed) {
                            e.key._changed = {};
                        }
                        for (var prop in e.data) {
                            e.key._changed[prop] = true;
                        }
                    }
                    _this.hasChanges = true;
                    var grid = _this.tableViewModel.instance;
                    grid.repaint();
                },
                onRowRemoved: function (e) {
                    var grid = _this.tableViewModel.instance;
                    grid.option("editing.mode", "cell");
                    grid.repaint();
                },
                onSelectionChanged: function (e) {
                    _this.hasSelection = e.selectedRowKeys.length > 0;
                    var grid = _this.tableViewModel.instance;
                    grid.repaint();
                },
                onToolbarPreparing: function (e) {
                    var dataGrid = e.component;
                    e.toolbarOptions.items.push({
                        location: "center",
                        text: _this.caption || "Tabelle"
                    }, {
                        widget: "dxButton",
                        location: "before",
                        visible: !_this._isTableInNewMode,
                        options: {
                            hint: "Statement editieren",
                            icon: "fa fa-pencil",
                            onClick: function () {
                                _this.statementEditorViewModel.show();
                            }
                        }
                    }, {
                        widget: "dxButton",
                        location: "before",
                        visible: !_this._isTableInNewMode,
                        options: {
                            hint: "Daten neu aus Datenbank laden",
                            icon: "fa fa-refresh",
                            onClick: function () {
                                _this.loadData();
                            }
                        }
                    }, {
                        widget: "dxButton",
                        location: "before",
                        visible: !_this._isTableInNewMode,
                        options: {
                            hint: "Daten ändern",
                            icon: "fa fa-chain",
                            onClick: function () {
                                _this.changeDataViewModel.show();
                            }
                        }
                    }, {
                        widget: "dxButton",
                        location: "before",
                        visible: !_this._isTableInNewMode,
                        options: {
                            hint: "Neue Zeile erstellen",
                            icon: "fa fa-plus",
                            onClick: function () {
                                _this._isTableInNewMode = true;
                                var grid = _this.tableViewModel.instance;
                                grid.option("editing.mode", "row");
                                grid.addRow();
                            }
                        }
                    }, {
                        widget: "dxButton",
                        location: "before",
                        visible: !_this._isTableInNewMode && _this.hasChanges,
                        options: {
                            hint: "Geänderte Daten speichern",
                            icon: "fa fa-floppy-o",
                            onClick: function () {
                                _this.saveData();
                            }
                        }
                    }, {
                        widget: "dxButton",
                        location: "before",
                        visible: _this._isTableInNewMode,
                        options: {
                            hint: "Änderungen übernehmen",
                            icon: "fa fa-check",
                            onClick: function () {
                                _this._isTableInNewMode = false;
                                _this.hasChanges = true;
                                var grid = _this.tableViewModel.instance;
                                grid.saveEditData();
                                grid.option("editing.mode", "cell");
                                grid.repaint();
                            }
                        }
                    }, {
                        widget: "dxButton",
                        location: "before",
                        visible: _this._isTableInNewMode,
                        options: {
                            hint: "Änderungen verwerfen",
                            icon: "fa fa-undo",
                            onClick: function () {
                                _this._isTableInNewMode = false;
                                var grid = _this.tableViewModel.instance;
                                grid.cancelEditData();
                                grid.option("editing.mode", "cell");
                            }
                        }
                    }, {
                        widget: "dxButton",
                        location: "before",
                        visible: !_this._isTableInNewMode && _this.hasSelection,
                        options: {
                            hint: "Markierte Zeilen löschen",
                            icon: "fa fa-trash-o",
                            onClick: function () {
                                var grid = _this.tableViewModel.instance;
                                var selectedRows = grid.getSelectedRowsData();
                                if (selectedRows.length === 0) {
                                    DevExpress.ui.dialog.alert("Bitte markieren Sie zuerst die zu löschenden Zeilen", "Information");
                                }
                                else {
                                    DevExpress.ui.dialog.confirm("Sind Sie sicher, dass Sie die markierte(n) " + selectedRows.length + " Zeile(n) l\u00F6schen wollen?", "Frage").then(function (r) {
                                        if (!r) {
                                            return;
                                        }
                                        grid.getSelectedRowsData().forEach(function (r) {
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
                        options: {
                            hint: "Spalte suchen",
                            icon: "fa fa-search",
                            onClick: function () {
                                _this.findColumnViewModel.show();
                            }
                        }
                    }, {
                        widget: "dxButton",
                        location: "before",
                        visible: !_this._isTableInNewMode,
                        options: {
                            hint: "Daten nach Excel exportieren",
                            icon: "fa fa-file-excel-o",
                            onClick: function () {
                                var grid = _this.tableViewModel.instance;
                                grid.exportToExcel(grid.getSelectedRowKeys().length > 0 ? true : false);
                            }
                        }
                    }, {
                        location: "after",
                        html: "<i class='fa fa-exclamation table-no-all-rows-loaded' title='Es wurden nicht alle Daten geladen'></i>",
                        visible: !_this._isTableInNewMode && _this.hasMoreRows
                    }, {
                        widget: "dxButton",
                        location: "after",
                        options: {
                            hint: "Tabellen schließen",
                            icon: "fa fa-times",
                            onClick: function () {
                                _this.notification.onDispose(_this);
                            }
                        }
                    });
                }
            };
        }
        Table.prototype.bind = function () {
            this.loadData();
        };
        Table.prototype.attached = function () {
            this.table.registerTable(this);
        };
        Table.prototype.detached = function () {
            this.table.deregisterTable(this);
        };
        Table.prototype.calcTextWidth = function (text) {
            var canvas = this._canvas || (this._canvas = document.createElement("canvas"));
            var context = canvas.getContext("2d");
            context.font = "12pt arial";
            var metrics = context.measureText(text);
            return Math.ceil(metrics.width);
        };
        Table.prototype.calcColumnWidth = function (data, fieldName, header) {
            var min = Math.min(data.length, 15);
            var curr = this.calcTextWidth(header);
            for (var i = 0; i < min; i++) {
                var val = data[i][fieldName];
                if (val == void (0)) {
                    continue;
                }
                var width = this.calcTextWidth(val);
                if (curr < width) {
                    curr = width;
                }
            }
            if (curr > 250) {
                curr = 250;
            }
            else if (curr < 30) {
                curr = 30;
            }
            return curr + 5 + "px";
        };
        Table.prototype.loadData = function () {
            var _this = this;
            this.sql
                .execute(this.tableData)
                .then(function (r) {
                if (!r || r.tableId) {
                    return;
                }
                _this.tableData = r.tableData;
                _this.caption = _this.tableData.tables + " [" + _this.tableData.tableId + "]";
                _this.hasChanges = false;
                _this.hasSelection = false;
                var grid = _this.tableViewModel.instance;
                var columns = _this.tableData.columns.map(function (c) { return ({
                    caption: c.caption,
                    dataField: c.internalFieldName,
                    width: _this.calcColumnWidth(r.result.data, c.internalFieldName, c.caption),
                    cssClass: r.columnsSave.find(function (d) { return d.internalFieldName === c.internalFieldName; }) ? null : "column-disabled"
                }); });
                if (!_this.tableData.changeData) {
                    _this.tableData.changeData = [];
                }
                var infoText = "Seite {0} von {1}";
                _this.hasMoreRows = r.result.hasMoreRows;
                if (r.result.hasMoreRows) {
                    infoText += " (es wurden nicht alle Daten geladen)";
                }
                else {
                    infoText += " ({2} Datensätze)";
                }
                grid.option("pager.infoText", infoText);
                grid.option("columns", columns);
                _this.setGridData(r.result.data);
            });
        };
        Table.prototype.saveData = function () {
            var _this = this;
            var tableData = Object.assign({}, this.tableData);
            tableData.data = this.dataSource.filter(function (c) {
                return !!c._state;
            });
            this.sql
                .save(tableData)
                .then(function (r) {
                if (r && r.ok) {
                    _this.loadData();
                }
            });
        };
        Table.prototype.setGridData = function (data) {
            var grid = this.tableViewModel.instance;
            grid.option("dataSource", data);
            this.dataSource = data;
            this.hasChanges = data.some(function (c) { return c["_state"] && c["_state"] != 0; });
            grid.repaint();
        };
        Table.prototype.onColumnSelected = function (columnName) {
            if (!columnName) {
                return;
            }
            var grid = this.tableViewModel.instance;
            var columns = grid.option("columns");
            var column = grid.getCellElement(0, columnName);
            if (!column) {
                return;
            }
            grid.focus(column);
        };
        return Table;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Table.prototype, "tableData", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Table.prototype, "notification", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", change_data_1.ChangeData)
    ], Table.prototype, "changeDataViewModel", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", statement_editor_1.StatementEditor)
    ], Table.prototype, "statementEditorViewModel", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", find_column_1.FindColumn)
    ], Table.prototype, "findColumnViewModel", void 0);
    __decorate([
        aurelia_framework_1.observable,
        __metadata("design:type", Object)
    ], Table.prototype, "tableViewModel", void 0);
    Table = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Services.SqlService, Services.TableService, aurelia_framework_1.TaskQueue])
    ], Table);
    exports.Table = Table;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/services/table-service',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableService = (function () {
        function TableService() {
            this.tables = [];
        }
        TableService.prototype.getTableDataByTableId = function (tableId) {
            var table = this.tables.find(function (c) { return c.tableData.tableId == tableId; });
            if (table) {
                return table.tableData;
            }
            else {
                return null;
            }
        };
        TableService.prototype.registerTable = function (table) {
            this.tables.push(table);
        };
        TableService.prototype.deregisterTable = function (table) {
            var index = this.tables.indexOf(table);
            if (index < 0) {
                return;
            }
            this.tables.splice(index, 1);
        };
        return TableService;
    }());
    TableService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [])
    ], TableService);
    exports.TableService = TableService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/services/sql-service',["require", "exports", "aurelia-framework", "../../framework/base/services/export", "./table-service"], function (require, exports, aurelia_framework_1, export_1, table_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SqlService = (function () {
        function SqlService(rest, table) {
            this.rest = rest;
            this.table = table;
        }
        SqlService.prototype.execute = function (tableData) {
            var _this = this;
            this.checkReferencedTableData(tableData);
            var promise = new Promise(function (resolve, reject) {
                _this
                    .post("Sql/Execute", tableData)
                    .then(function (result) {
                    _this.checkResult(resolve, reject, result);
                }).catch(function (error) {
                    reject(error);
                });
            });
            return promise;
        };
        SqlService.prototype.executeChanges = function (tableData) {
            var _this = this;
            this.checkReferencedTableData(tableData);
            var promise = new Promise(function (resolve, reject) {
                _this
                    .post("Sql/ExecuteChanges", tableData)
                    .then(function (result) {
                    _this.checkResult(resolve, reject, result);
                }).catch(function (error) {
                    reject(error);
                });
            });
            return promise;
        };
        SqlService.prototype.formatSql = function (script) {
            return this
                .post("Sql/FormatSql", {
                script: script
            });
        };
        SqlService.prototype.save = function (tableData) {
            var _this = this;
            var promise = new Promise(function (resolve, reject) {
                _this
                    .post("Sql/Save", tableData)
                    .then(function (result) {
                    _this.checkResult(resolve, reject, result);
                }).catch(function (error) {
                    reject(error);
                });
            });
            return promise;
        };
        SqlService.prototype.selectSql = function (tableData) {
            return this
                .post("Sql/SelectSql", tableData);
        };
        SqlService.prototype.tableInfo = function (databaseId, tableName) {
            return this
                .post("Sql/TableInfo", {
                databaseId: databaseId,
                tableName: tableName
            });
        };
        SqlService.prototype.checkReferencedTableData = function (tableData) {
            if (tableData.referencedTableDataId) {
                var referencedTable = this.table.tables.find(function (c) { return c.tableData.tableId == tableData.referencedTableDataId; });
                if (referencedTable) {
                    tableData.referencedTableData = {
                        tableId: tableData.referencedTableDataId,
                        databaseId: tableData.databaseId,
                        columns: tableData.columns,
                    };
                    tableData.data = referencedTable.dataSource;
                }
                else {
                    tableData.referencedTableData = null;
                    tableData.data = null;
                }
            }
            else {
                tableData.referencedTableData = null;
                tableData.data = null;
            }
        };
        SqlService.prototype.checkResult = function (resolve, reject, result) {
            var _this = this;
            if (result.exception) {
                DevExpress.ui.dialog.alert(result.exception, "Fehler");
                reject();
            }
            else if (result.transactionId != void (0)) {
                DevExpress.ui.dialog.confirm(result.changedRows + " Datens\u00E4tze wurden ge\u00E4ndert. Speichern?", "Frage").then(function (dialogResult) {
                    if (dialogResult) {
                        _this.commit(resolve, reject, result);
                    }
                    else {
                        _this.rollback(resolve, reject, result);
                    }
                });
            }
            else {
                resolve(result);
            }
        };
        SqlService.prototype.commit = function (resolve, reject, result) {
            this
                .post("Sql/Commit", {
                transactionId: result.transactionId
            }).then(function (commitResult) {
                resolve(commitResult);
                if (!commitResult.ok) {
                    DevExpress.ui.dialog.alert("Fehler beim Commit", "Information");
                }
            }).catch(function (error) {
                reject(error);
            });
        };
        SqlService.prototype.rollback = function (resolve, reject, result) {
            this
                .post("Sql/Rollback", {
                transactionId: result.transactionId
            }).then(function (rollbackResult) {
                resolve(rollbackResult);
                if (!rollbackResult.ok) {
                    DevExpress.ui.dialog.alert("Fehler beim Rollback", "Information");
                }
            }).catch(function (error) {
                reject(error);
            });
        };
        SqlService.prototype.post = function (url, data) {
            return this.rest
                .post({
                url: this.rest.getApiUrl(url),
                data: data
            });
        };
        return SqlService;
    }());
    SqlService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [export_1.RestService,
            table_service_1.TableService])
    ], SqlService);
    exports.SqlService = SqlService;
});

define('resources/services/export',["require", "exports", "./database-service", "./sql-service", "./table-service"], function (require, exports, database_service_1, sql_service_1, table_service_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(database_service_1);
    __export(sql_service_1);
    __export(table_service_1);
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/dx/services/dx-template-service',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DxTemplateService = (function () {
        function DxTemplateService(templatingEngine) {
            this.templatingEngine = templatingEngine;
            this.templates = {};
        }
        DxTemplateService.prototype.registerTemplate = function (key, template) {
            this.templates[key] = template;
        };
        DxTemplateService.prototype.getTemplates = function (scope, overrideContext, resources) {
            var _this = this;
            var result = {};
            var _loop_1 = function (templateKey) {
                result[templateKey] = {
                    render: function (renderData) {
                        return _this.render(_this.templates[templateKey], renderData.container, resources, scope, renderData.model);
                    }
                };
            };
            for (var templateKey in this.templates) {
                _loop_1(templateKey);
            }
            return result;
        };
        DxTemplateService.prototype.render = function (template, container, resources, scope, model) {
            var newItem;
            if (typeof template === "string") {
                newItem = document.createElement("div");
                newItem.innerHTML = template;
            }
            else {
                newItem = template.cloneNode(true);
            }
            var newElement = $(newItem).appendTo(container);
            var itemBindingContext;
            var itemOverrideContext;
            if (model) {
                itemBindingContext = {
                    data: model
                };
                itemOverrideContext = aurelia_framework_1.createOverrideContext(scope.bindingContext, scope.overrideContext);
            }
            else {
                itemBindingContext = scope.bindingContext;
                itemOverrideContext = scope.overrideContext;
            }
            var result = this.templatingEngine.enhance({
                element: newElement.get(0),
                bindingContext: itemBindingContext,
                overrideContext: itemOverrideContext,
                resources: resources
            });
            result.attached();
            return $(newElement);
        };
        return DxTemplateService;
    }());
    DxTemplateService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_framework_1.TemplatingEngine])
    ], DxTemplateService);
    exports.DxTemplateService = DxTemplateService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/dx/elements/dx-widget',["require", "exports", "aurelia-framework", "../services/dx-template-service", "../../base/export", "jquery"], function (require, exports, aurelia_framework_1, dx_template_service_1, export_1, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DxWidget = DxWidget_1 = (function () {
        function DxWidget(element, templatingEngine, bindingEngine, binding, deepObserver, dxTemplate) {
            this.element = element;
            this.templatingEngine = templatingEngine;
            this.bindingEngine = bindingEngine;
            this.binding = binding;
            this.deepObserver = deepObserver;
            this.dxTemplate = dxTemplate;
            this.templates = {};
        }
        DxWidget.prototype.created = function (owningView, myView) {
            this.owningView = owningView;
            this.extractTemplates();
        };
        DxWidget.prototype.bind = function (bindingContext, overrideContext) {
            this.bindingContext = bindingContext;
            this.overrideContext = overrideContext;
            this.checkBindings();
        };
        DxWidget.prototype.attached = function () {
            this.renderInline();
            this.options = this.options || {};
            this.options.onOptionChanged = this.onOptionChanged.bind(this);
            this.options.modelByElement = DxWidget_1.modelByElement;
            this.options.integrationOptions = {
                templates: this.templates
            };
            var element = $(this.element);
            if (!element[this.name]) {
                throw new Error("Widget " + this.name + " does not exist");
            }
            element = element[this.name](this.options);
            if (this.validator) {
                element.dxValidator(this.validator);
            }
            else if (this.options["validators"]) {
                element.dxValidator({
                    validationRules: this.options["validators"]
                });
            }
            this.instance = element[this.name]("instance");
            this.registerBindings();
        };
        DxWidget.prototype.detached = function () {
            if (this.instance) {
                this.instance._dispose();
                this.instance = null;
            }
            if (this.options && this.options.bindingOptions) {
                for (var _i = 0, _a = this.options.bindingOptions; _i < _a.length; _i++) {
                    var binding = _a[_i];
                    if (binding.deepObserver) {
                        binding.deepObserver();
                        binding.deepObserver = null;
                    }
                }
            }
        };
        DxWidget.prototype.resetValidation = function () {
            if (this.instance.option("isValid") === false) {
                this.setOptionValue("isValid", true);
            }
        };
        DxWidget.modelByElement = function (element) {
            if (element.jquery) {
                element = element.get(0);
            }
            if (!element.au || !element.au.controller || !element.au.controller.viewModel) {
                return null;
            }
            return element.au.controller.viewModel.bindingContext;
        };
        DxWidget.prototype.extractTemplates = function () {
            var _this = this;
            $(this.element)
                .children("dx-template")
                .each(function (index, item) {
                var itemJQuery = $(item);
                var name = itemJQuery.attr("name");
                var alias = itemJQuery.attr("alias") || "data";
                _this.templates[name] = {
                    render: function (renderData) {
                        return _this.dxTemplate.render(item, renderData.container, _this.owningView.resources, {
                            bindingContext: _this.bindingContext,
                            overrideContext: _this.overrideContext
                        }, renderData.model);
                    }
                };
                $(item).remove();
            });
            Object.assign(this.templates, this.dxTemplate.getTemplates(this.bindingContext, this.overrideContext, this.owningView.resources));
        };
        DxWidget.prototype.registerBindings = function () {
            var _this = this;
            if (!this.options.bindingOptions) {
                return;
            }
            var _loop_1 = function (property) {
                var binding = this_1.options.bindingOptions[property];
                var context = this_1.binding.getBindingContext(binding.parsed, {
                    bindingContext: this_1.bindingContext,
                    overrideContext: this_1.overrideContext
                });
                this_1.bindingEngine.expressionObserver(context, binding.expression)
                    .subscribe(function (newValue, oldValue) {
                    _this.setOptionValue(property, newValue);
                    _this.registerDeepObserver(binding, property, value);
                });
                var value = binding.parsed.evaluate({
                    bindingContext: this_1.bindingContext,
                    overrideContext: this_1.overrideContext
                });
                this_1.setOptionValue(property, value);
                this_1.registerDeepObserver(binding, property, value);
            };
            var this_1 = this;
            for (var property in this.options.bindingOptions) {
                _loop_1(property);
            }
        };
        DxWidget.prototype.checkBindings = function () {
            if (!this.options) {
                throw new Error("Invalid or no options for " + this.name);
            }
            if (!this.options.bindingOptions) {
                return;
            }
            for (var property in this.options.bindingOptions) {
                var binding = this.checkBinding(property);
            }
        };
        DxWidget.prototype.checkBinding = function (property) {
            var bindingOptions = this.options.bindingOptions;
            if (typeof bindingOptions[property] === "string") {
                bindingOptions[property] = {
                    expression: bindingOptions[property]
                };
            }
            var binding = bindingOptions[property];
            binding.parsed = this.bindingEngine.parseExpression(binding.expression);
        };
        DxWidget.prototype.registerDeepObserver = function (binding, property, value) {
            var _this = this;
            if (binding.deepObserver) {
                binding.deepObserver();
                binding.deepObserver = null;
            }
            if (!binding.deep) {
                return;
            }
            binding.deepObserver = this.deepObserver.observe(value, function () {
                _this.setOptionValue(property, value);
            });
        };
        DxWidget.prototype.onOptionChanged = function (e) {
            if (!this.options.bindingOptions) {
                return;
            }
            var binding = this.options.bindingOptions[e.name];
            if (!binding) {
                return;
            }
            if (!binding.parsed.isAssignable) {
                return;
            }
            var currValue = binding.parsed.evaluate({
                bindingContext: this.bindingContext,
                overrideContext: this.overrideContext
            });
            if (currValue === e.value) {
                return;
            }
            binding.parsed.assign({
                bindingContext: this.bindingContext,
                overrideContext: this.overrideContext
            }, e.value);
        };
        DxWidget.prototype.renderInline = function () {
            var _this = this;
            $(this.element).children().each(function (index, child) {
                var result = _this.templatingEngine.enhance({
                    element: child,
                    bindingContext: _this.bindingContext,
                    overrideContext: _this.overrideContext
                });
                result.attached();
            });
        };
        DxWidget.prototype.setOptionValue = function (propertyName, value) {
            if (value == void (0) && (propertyName === "items" || propertyName === "dataSource")) {
                value = [];
            }
            this.instance.option(propertyName, value);
        };
        return DxWidget;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], DxWidget.prototype, "name", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], DxWidget.prototype, "options", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], DxWidget.prototype, "validator", void 0);
    DxWidget = DxWidget_1 = __decorate([
        aurelia_framework_1.autoinject,
        aurelia_framework_1.processContent(false),
        __metadata("design:paramtypes", [Element,
            aurelia_framework_1.TemplatingEngine,
            aurelia_framework_1.BindingEngine,
            export_1.BindingService,
            export_1.DeepObserverService,
            dx_template_service_1.DxTemplateService])
    ], DxWidget);
    exports.DxWidget = DxWidget;
    var DxWidget_1;
});

define('framework/dx/services/export',["require", "exports", "./dx-template-service"], function (require, exports, dx_template_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DxTemplateService = dx_template_service_1.DxTemplateService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/databases/databases',["require", "exports", "aurelia-framework", "../../services/export"], function (require, exports, aurelia_framework_1, Services) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Databases = (function () {
        function Databases(database) {
            var _this = this;
            this.database = database;
            this.databasesPopupOptions = {
                contentTemplate: "contentTemplate",
                showCloseButton: false,
                toolbarItems: [{
                        widget: "dxButton",
                        location: "before",
                        options: {
                            hint: "Datenbank hinzufügen",
                            icon: "fa fa-plus",
                            onClick: function () {
                                _this.database.databases.push({});
                            }
                        }
                    }, {
                        text: "Datenbanken konfigurieren",
                        location: "center"
                    }, {
                        widget: "dxButton",
                        location: "after",
                        options: {
                            hint: "Schließen",
                            icon: "fa fa-times",
                            onClick: function () {
                                _this.databasesPopupVisible = false;
                            }
                        }
                    }],
                onHiding: function () {
                    _this.database.reload();
                },
                onShown: function (e) {
                },
                bindingOptions: {
                    "visible": "databasesPopupVisible"
                }
            };
            this.providerSelectOptions = {
                displayExpr: "name",
                valueExpr: "fullName",
                width: "300px",
                bindingOptions: {
                    "dataSource": "providers",
                    "value": "databaseItem.providerName"
                }
            };
            this.nameTextOptions = {
                width: "300px",
                bindingOptions: {
                    "value": "databaseItem.caption"
                }
            };
            this.connectionStringTextOptions = {
                width: "100%",
                bindingOptions: {
                    "value": "databaseItem.connectionString"
                }
            };
            this.saveDatabaseButtonOptions = {
                text: "Speichern",
                icon: "fa fa-floppy-o",
                onClick: function (e) {
                    _this.database.postDatabase(e.model.databaseItem);
                }
            };
            this.deleteDatabaseButtonOptions = {
                text: "Entfernen",
                icon: "fa fa-trash-o",
                onClick: function (e) {
                    _this.database.deleteDatabase(e.model.databaseItem);
                }
            };
            database.getProviders()
                .then(function (r) {
                _this.providers = r;
            });
        }
        Databases.prototype.show = function () {
            this.databasesPopupVisible = true;
        };
        return Databases;
    }());
    Databases = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Services.DatabaseService])
    ], Databases);
    exports.Databases = Databases;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/container/container',["require", "exports", "aurelia-framework", "../databases/databases", "../../services/export"], function (require, exports, aurelia_framework_1, databases_1, Services) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = (function () {
        function Container(table, database, taskQueue) {
            var _this = this;
            this.table = table;
            this.database = database;
            this.taskQueue = taskQueue;
            this.tableSelectionNotification = {
                onTableClicked: this.onTableClicked.bind(this)
            };
            this.tableNotification = {
                onRelationClicked: this.onRelationClicked.bind(this),
                onDispose: this.onTableDispose.bind(this)
            };
            this.settingButtonOptions = {
                icon: "fa fa-cog",
                onClick: function () {
                    _this.containerContextMenuViewModel.instance.show();
                }
            };
            this.containerContextMenuOptions = {
                target: "#settings-button",
                position: { my: "left bottom", at: "top" },
                items: [{
                        text: "Alle Tabellen schließen",
                        onClick: function () {
                            _this.table.tables.slice().forEach(function (c) { return c.notification.onDispose(c); });
                        }
                    }, {
                        text: "Struktur laden",
                        beginGroup: true,
                        onClick: function () {
                        }
                    }, {
                        text: "Struktur speichern",
                        onClick: function () {
                        }
                    }, {
                        text: "Datenbanken verwalten",
                        beginGroup: true,
                        onClick: function () {
                            _this.databasesViewModel.show();
                        }
                    }],
                bindingOptions: {
                    "items[3].disabled": "databaseDisabled"
                }
            };
            this.tableData = [];
        }
        Object.defineProperty(Container.prototype, "databaseDisabled", {
            get: function () {
                return !this.database
                    || !this.database.databases;
            },
            enumerable: true,
            configurable: true
        });
        Container.prototype.onRelationClicked = function (databaseId, tableName, columnName, value) {
            var table = {
                tableId: new Date().getTime(),
                databaseId: databaseId,
                tableName: tableName,
                columnName: columnName,
                value: value,
                rows: 100
            };
            this.tableData.push(table);
            this.queueRefreshTablesLayout();
        };
        Container.prototype.onTableClicked = function (databaseId, tableName, alias) {
            var table = {
                tableId: new Date().getTime(),
                databaseId: databaseId,
                tableName: tableName,
                alias: alias,
                rows: 100
            };
            this.tableData.push(table);
            this.queueRefreshTablesLayout();
        };
        Container.prototype.onTableDispose = function (table) {
            var index = this.tableData.findIndex(function (c) { return c.tableId == table.tableData.tableId; });
            if (index >= 0) {
                this.tableData.splice(index, 1);
            }
            this.queueRefreshTablesLayout();
        };
        Container.prototype.queueRefreshTablesLayout = function () {
            var _this = this;
            if (this.tableData.length <= 1) {
                this.tableHeight = "100%";
            }
            else if (this.tableData.length == 2) {
                this.tableHeight = "50%";
            }
            else {
                this.tableHeight = "33%";
            }
            this.taskQueue.queueMicroTask(function () {
                _this.table.tables.forEach(function (t) {
                    if (!t.tableViewModel || !t.tableViewModel.instance) {
                        return;
                    }
                    var grid = t.tableViewModel.instance;
                    grid.updateDimensions();
                });
            });
        };
        return Container;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Container.prototype, "containerContextMenuViewModel", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", databases_1.Databases)
    ], Container.prototype, "databasesViewModel", void 0);
    __decorate([
        aurelia_framework_1.computedFrom("database", "database.databases"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Container.prototype, "databaseDisabled", null);
    Container = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Services.TableService, Services.DatabaseService, aurelia_framework_1.TaskQueue])
    ], Container);
    exports.Container = Container;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/attributes/icon/fa-icon-attribute',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FaIconAttribute = (function () {
        function FaIconAttribute(element) {
            this.element = element;
        }
        FaIconAttribute.prototype.bind = function () {
            this.setClass();
        };
        FaIconAttribute.prototype.iconChanged = function (newValue, oldValue) {
            this.setClass();
        };
        FaIconAttribute.prototype.setClass = function () {
            var element = $(this.element);
            if (this.currentIcon) {
                element.removeClass(this.currentIcon);
                this.currentIcon = null;
            }
            if (this.icon) {
                this.currentIcon = "fa fa-" + this.icon;
                element.addClass(this.currentIcon);
            }
        };
        return FaIconAttribute;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], FaIconAttribute.prototype, "icon", void 0);
    FaIconAttribute = __decorate([
        aurelia_framework_1.autoinject,
        aurelia_framework_1.customAttribute("fa-icon"),
        __metadata("design:paramtypes", [Element])
    ], FaIconAttribute);
    exports.FaIconAttribute = FaIconAttribute;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('framework/base/attributes/translation/translation-attribute',["require", "exports", "aurelia-framework", "../../services/localization-service"], function (require, exports, aurelia_framework_1, localization_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TrCustomAttribute = (function () {
        function TrCustomAttribute(element, localization) {
            this.element = element;
            this.localization = localization;
        }
        TrCustomAttribute.prototype.bind = function (bindingContext) {
            this.expressionProvider = bindingContext.expressions;
            this.setInnerHtml();
        };
        TrCustomAttribute.prototype.keyChanged = function (newValue, oldValue) {
            this.setInnerHtml();
        };
        TrCustomAttribute.prototype.setInnerHtml = function () {
            var _this = this;
            this.localization.translate(this.expressionProvider, this.key, function (val) {
                _this.element.innerHTML = val;
            });
        };
        return TrCustomAttribute;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], TrCustomAttribute.prototype, "mode", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], TrCustomAttribute.prototype, "key", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], TrCustomAttribute.prototype, "markdown", void 0);
    TrCustomAttribute = __decorate([
        aurelia_framework_1.autoinject,
        aurelia_framework_1.customAttribute("tr"),
        __metadata("design:paramtypes", [Element,
            localization_service_1.LocalizationService])
    ], TrCustomAttribute);
    exports.TrCustomAttribute = TrCustomAttribute;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./app.css\"></require>\r\n\r\n  <container></container>\r\n</template>\r\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "html,\nbody {\n  margin: 0;\n  padding: 0;\n  height: 100vh;\n  width: 100vw;\n  font-family: \"Helvetica Neue\", \"Segoe UI\", Helvetica, Verdana, sans-serif;\n  font-size: 12px;\n}\n.dx-datagrid-header-panel .dx-toolbar {\n  padding: 5px;\n  margin: 0;\n}\n.dx-datagrid-header-panel .dx-toolbar .dx-toolbar-label {\n  font-size: 12px;\n}\n.dx-popup-content .dx-button {\n  margin: 0 !important;\n}\n.row-modified {\n  background-color: rgba(135, 211, 124, 0.2);\n}\n.row-inserted {\n  background-color: rgba(135, 211, 124, 0.2);\n}\n.row-deleted {\n  background-color: rgba(236, 100, 75, 0.2);\n}\n.column-disabled {\n  background-color: rgba(236, 100, 75, 0.2);\n}\n"; });
define('text!resources/import.css', ['module'], function(module) { module.exports = ""; });
define('text!framework/dx/elements/dx-widget.html', ['module'], function(module) { module.exports = "<template class=\"dx-widget\">\r\n</template>"; });
define('text!resources/elements/change-data/change-data.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./change-data.css\"></require>\r\n\r\n  <dx-widget name=\"dxPopup\" options.bind=\"changeDataPopupOptions\" class=\"changedata-popup\">\r\n    <dx-template name=\"contentTemplate\">\r\n      <div class=\"changedata-container\">\r\n        <statement-editor view-model.ref=\"statementEditorViewModel\" notification.bind=\"statementEditorNotification\" table-data.bind=\"tableData\">          \r\n        </statement-editor>\r\n        <code-editor view-model.ref=\"codeEditorViewModel\" notification.bind=\"codeEditorNotification\" table-data.bind=\"tableData\">\r\n        </code-editor>\r\n\r\n        <div repeat.for=\"changeDataItem of tableData.changeData\">\r\n          <div if.bind=\"changeDataItem.type == 'sql'\" class=\"changedata-custom-settings\">\r\n            <div>\r\n              SQL\r\n            </div>\r\n            <div>\r\n              <dx-widget name=\"dxButton\" options.bind=\"sqlChangeDataOptions\">\r\n              </dx-widget>\r\n            </div>\r\n          </div>\r\n          <div if.bind=\"changeDataItem.type == 'text'\" class=\"changedata-custom-settings\">\r\n            <div>\r\n              Text\r\n            </div>\r\n            <div>\r\n              <dx-widget name=\"dxTextBox\" options.bind=\"textChangeDataOptions\">\r\n              </dx-widget>\r\n            </div>\r\n          </div>\r\n          <div if.bind=\"changeDataItem.type == 'running'\" class=\"changedata-custom-settings\">\r\n            <div>\r\n              Laufende Nummer ab\r\n            </div>\r\n            <div>\r\n              <dx-widget name=\"dxNumberBox\" options.bind=\"runningChangeDataOptions\">\r\n              </dx-widget>\r\n            </div>\r\n          </div>\r\n          <div if.bind=\"changeDataItem.type == 'code'\" class=\"changedata-custom-settings\">\r\n            <div>\r\n              C#-Code\r\n            </div>\r\n            <div>\r\n              <dx-widget name=\"dxButton\" options.bind=\"codeChangeDataOptions\">\r\n              </dx-widget>\r\n            </div>\r\n          </div>\r\n          <div class=\"changedata-default-settings\">\r\n            <div>\r\n              <dx-widget name=\"dxSelectBox\" options.bind=\"columnChangeDataOptions\">\r\n              </dx-widget>\r\n            </div>\r\n            <div>\r\n              <dx-widget name=\"dxButton\" options.bind=\"deleteChangeDataOptions\">\r\n              </dx-widget>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </dx-template>\r\n  </dx-widget>\r\n</template>"; });
define('text!resources/elements/code-editor/code-editor.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./code-editor.css\"></require>\r\n\r\n  <dx-widget name=\"dxPopup\" options.bind=\"codePopupOptions\" class=\"codeeditor-popup\">\r\n    <dx-template name=\"contentTemplate\">\r\n      <div class=\"codeeditor-container\">\r\n        <editor class=\"codeeditor\" view-model.ref=\"editorViewModel\" table-data.bind=\"editorData\" language=\"csharp\"></editor>\r\n        <column-chooser class=\"codeditor-columnchooser\" view-model.ref=\"columnChooserViewModel\" fixed-table-id.bind=\"fixedTableId\" notification.bind=\"columnChooserNotification\"></column-chooser>\r\n      </div>\r\n    </dx-template>\r\n  </dx-widget>\r\n</template>"; });
define('text!resources/elements/column-chooser/column-chooser.html', ['module'], function(module) { module.exports = "<template class=\"columnchooser\">\r\n  <require from=\"./column-chooser.css\"></require>\r\n\r\n  <div class=\"columnchooser-tables\">\r\n    <dx-widget name=\"dxSelectBox\" options.bind=\"tableSelectOptions\" class=\"columnchooser-tables-select-box\"></dx-widget>\r\n  </div>\r\n  <div class=\"columnchooser-columns\">\r\n    <div>\r\n      <dx-widget name=\"dxDataGrid\" options.bind=\"columnGridOptions\"></dx-widget>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!framework/base/styles/styles.css', ['module'], function(module) { module.exports = "@keyframes leftFadeIn {\n  from {\n    opacity: 0;\n    transform: translateX(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: \"Helvetica Neue\", \"Segoe UI\", Helvetica, Verdana, sans-serif;\n  font-size: 12px;\n}\n.t--margin-top {\n  margin-top: 12px;\n}\n.t--editor-caption {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.t--cursor-pointer {\n  cursor: pointer;\n}\n.t--invisible-submit {\n  height: 0;\n  width: 0;\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n"; });
define('text!resources/elements/container/container.html', ['module'], function(module) { module.exports = "<template class=\"container\">\r\n  <require from=\"./container.css\"></require>\r\n\r\n  <div class=\"container-sidebar\">\r\n    <div class=\"container-table-selection\">\r\n      <div>\r\n        <table-selection notification.bind=\"tableSelectionNotification\"></table-selection>\r\n      </div>\r\n    </div>\r\n    <div class=\"container-buttons\">\r\n      <dx-widget id=\"settings-button\" name=\"dxButton\" options.bind=\"settingButtonOptions\"></dx-widget>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"tables\">\r\n    <table repeat.for=\"data of tableData\" css.bind=\"{height: tableHeight}\" table-data.bind=\"data\" notification.bind=\"tableNotification\"></table>\r\n  </div>\r\n\r\n  <databases view-model.ref=\"databasesViewModel\"></databases>\r\n  <dx-widget name=\"dxContextMenu\" view-model.ref=\"containerContextMenuViewModel\" options.bind=\"containerContextMenuOptions\"></dx-widget>\r\n</template>"; });
define('text!framework/base/styles/variables.css', ['module'], function(module) { module.exports = "@keyframes leftFadeIn {\n  from {\n    opacity: 0;\n    transform: translateX(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n"; });
define('text!resources/elements/databases/databases.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./databases.css\"></require>\r\n\r\n  <dx-widget name=\"dxPopup\" options.bind=\"databasesPopupOptions\" class=\"databases-popup\">\r\n    <dx-template name=\"contentTemplate\">\r\n      <div class=\"database-container\">\r\n        <div class=\"databases-item\" repeat.for=\"databaseItem of database.databases\">\r\n          <div class=\"databases-header\">\r\n            <div>\r\n              Name\r\n            </div>\r\n            <div>\r\n              <dx-widget name=\"dxTextBox\" options.bind=\"nameTextOptions\">\r\n              </dx-widget>\r\n            </div>\r\n            <div>\r\n              <dx-widget name=\"dxButton\" options.bind=\"saveDatabaseButtonOptions\">\r\n              </dx-widget>\r\n            </div>\r\n            <div>\r\n              <dx-widget name=\"dxButton\" options.bind=\"deleteDatabaseButtonOptions\">\r\n              </dx-widget>\r\n            </div>\r\n          </div>\r\n          <div class=\"databases-provider\">\r\n            <div>\r\n              Provider\r\n            </div>\r\n            <div>\r\n              <dx-widget name=\"dxSelectBox\" options.bind=\"providerSelectOptions\">\r\n              </dx-widget>\r\n            </div>\r\n          </div>\r\n          <div class=\"databases-connectionstring\">\r\n            <div>\r\n              Connection-String\r\n            </div>\r\n            <div>\r\n              <dx-widget name=\"dxTextBox\" options.bind=\"connectionStringTextOptions\">\r\n              </dx-widget>\r\n            </div>\r\n          </div>\r\n        </div>    \r\n      </div>\r\n    </dx-template>\r\n  </dx-widget>\r\n</template>"; });
define('text!resources/elements/editor/editor.html', ['module'], function(module) { module.exports = "<template class=\"editor\">  \r\n  <require from=\"./editor.css\"></require>\r\n</template>"; });
define('text!resources/elements/change-data/change-data.css', ['module'], function(module) { module.exports = ".changedata-popup .dx-popup-normal {\n  border-radius: 0;\n  border: 0;\n}\n.changedata-popup .dx-popup-normal.dx-state-focused.dx-overlay-content {\n  border: 0;\n}\n.changedata-popup .dx-popup-normal .dx-popup-content {\n  padding: 0;\n}\n.changedata-popup .dx-toolbar {\n  height: 50px;\n  margin: 0;\n  padding: 0 0;\n  background-color: #2C3E50;\n  box-sizing: border-box;\n  border-bottom: none;\n}\n.changedata-popup .dx-toolbar .dx-toolbar-items-container {\n  height: 50px;\n}\n.changedata-popup .dx-toolbar .dx-toolbar-items-container > div {\n  -webkit-border-horizontal-spacing: 0;\n  -webkit-border-vertical-spacing: 0;\n}\n.changedata-popup .dx-toolbar .dx-toolbar-label {\n  color: white;\n}\n.changedata-popup .dx-toolbar .dx-button {\n  border: 0;\n  background-color: transparent;\n  width: 50px;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n}\n.changedata-popup .dx-toolbar .dx-button:hover {\n  background-color: #698aac;\n}\n.changedata-popup .dx-toolbar .dx-button .dx-button-content {\n  display: flex;\n  align-items: center;\n}\n.changedata-popup .dx-toolbar .dx-button .dx-button-content i {\n  color: white;\n}\n.changedata-popup .dx-toolbar .dx-texteditor {\n  border: none;\n}\n.changedata-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button {\n  background-color: #507192;\n  padding: 0;\n}\n.changedata-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-up-icon,\n.changedata-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-down-icon {\n  background-color: #698aac;\n}\n.changedata-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-up-icon,\n.changedata-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-down-icon {\n  color: white;\n}\n.changedata-popup .dx-toolbar .dx-texteditor input {\n  background-color: #476481;\n  color: white;\n}\n.changedata-container {\n  padding: 12px 5px;\n  height: 100%;\n  overflow-y: auto;\n}\n.changedata-container > div {\n  display: flex;\n  padding-bottom: 5px;\n}\n.changedata-container .changedata-custom-settings {\n  display: flex;\n  align-items: center;\n}\n.changedata-container .changedata-custom-settings > div:first-child {\n  width: 150px;\n}\n.changedata-container .changedata-default-settings {\n  display: flex;\n  flex-grow: 1;\n  justify-content: flex-end;\n  margin-left: 30px;\n}\n.changedata-container .changedata-default-settings > div:first-child {\n  margin-right: 5px;\n}\n"; });
define('text!resources/elements/find-column/find-column.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./find-column.css\"></require>\r\n\r\n  <dx-widget name=\"dxPopup\" options.bind=\"findColumnPopupOptions\" class=\"findcolumn-popup\">\r\n    <dx-template name=\"contentTemplate\">\r\n      <div class=\"findcolumn-container\">\r\n        <dx-widget name=\"dxSelectBox\" options.bind=\"columnSelectDataOptions\">\r\n        </dx-widget>\r\n      </div>\r\n    </dx-template>\r\n  </dx-widget>\r\n</template>"; });
define('text!resources/elements/statement-editor/statement-editor.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./statement-editor.css\"></require>\r\n\r\n  <dx-widget name=\"dxPopup\" options.bind=\"statementPopupOptions\" class=\"statementeditor-popup\">\r\n    <dx-template name=\"contentTemplate\">\r\n      <div class=\"statementeditor-container\">\r\n        <table-selection class=\"statementeditor-table-selection\" view-model.ref=\"tableSelectionViewModel\" notification.bind=\"tableSelectionNotification\"></table-selection>\r\n        <editor class=\"statementeditor\" view-model.ref=\"editorViewModel\" table-data.bind=\"editorData\"></editor>\r\n        <column-chooser class=\"statementeditor-columnchooser\" view-model.ref=\"columnChooserViewModel\" fixed-table-id.bind=\"fixedTableId\" notification.bind=\"columnChooserNotification\"></column-chooser>\r\n      </div>\r\n    </dx-template>\r\n  </dx-widget>\r\n</template>"; });
define('text!resources/elements/table/table.html', ['module'], function(module) { module.exports = "<template class=\"table\">\r\n  <require from=\"./table.css\"></require>\r\n\r\n  <dx-widget name=\"dxDataGrid\" options.bind=\"tableOptions\" view-model.ref=\"tableViewModel\"></dx-widget>\r\n  <statement-editor view-model.ref=\"statementEditorViewModel\" notification.bind=\"statementEditorNotification\" table-data.bind=\"tableData\" editor-data.bind=\"tableData\"></statement-editor>\r\n  <change-data view-model.ref=\"changeDataViewModel\" table-data.bind=\"tableData\" notification.bind=\"changeDataNotification\" data-source.bind=\"dataSource\"></change-data>\r\n  <find-column view-model.ref=\"findColumnViewModel\" table-data.bind=\"tableData\" notification.bind=\"findColumnNotification\"></find-column>\r\n</template>"; });
define('text!resources/elements/code-editor/code-editor.css', ['module'], function(module) { module.exports = ".codeeditor-popup .dx-popup-normal {\n  border-radius: 0;\n  border: 0;\n}\n.codeeditor-popup .dx-popup-normal.dx-state-focused.dx-overlay-content {\n  border: 0;\n}\n.codeeditor-popup .dx-popup-normal .dx-popup-content {\n  padding: 0;\n}\n.codeeditor-popup .dx-toolbar {\n  height: 50px;\n  margin: 0;\n  padding: 0 0;\n  background-color: #2C3E50;\n  box-sizing: border-box;\n  border-bottom: none;\n}\n.codeeditor-popup .dx-toolbar .dx-toolbar-items-container {\n  height: 50px;\n}\n.codeeditor-popup .dx-toolbar .dx-toolbar-items-container > div {\n  -webkit-border-horizontal-spacing: 0;\n  -webkit-border-vertical-spacing: 0;\n}\n.codeeditor-popup .dx-toolbar .dx-toolbar-label {\n  color: white;\n}\n.codeeditor-popup .dx-toolbar .dx-button {\n  border: 0;\n  background-color: transparent;\n  width: 50px;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n}\n.codeeditor-popup .dx-toolbar .dx-button:hover {\n  background-color: #698aac;\n}\n.codeeditor-popup .dx-toolbar .dx-button .dx-button-content {\n  display: flex;\n  align-items: center;\n}\n.codeeditor-popup .dx-toolbar .dx-button .dx-button-content i {\n  color: white;\n}\n.codeeditor-popup .dx-toolbar .dx-texteditor {\n  border: none;\n}\n.codeeditor-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button {\n  background-color: #507192;\n  padding: 0;\n}\n.codeeditor-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-up-icon,\n.codeeditor-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-down-icon {\n  background-color: #698aac;\n}\n.codeeditor-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-up-icon,\n.codeeditor-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-down-icon {\n  color: white;\n}\n.codeeditor-popup .dx-toolbar .dx-texteditor input {\n  background-color: #476481;\n  color: white;\n}\n.codeeditor-container {\n  display: flex;\n  height: 100%;\n}\n.codeeditor-container > .codeeditor {\n  height: 100%;\n  width: 100%;\n}\n.codeeditor-container > .codeditor-columnchooser {\n  flex: 300px 0 0;\n  position: relative;\n}\n"; });
define('text!resources/elements/table-information/table-information.html', ['module'], function(module) { module.exports = "<template>\r\n  <dx-widget name=\"dxPopup\" options.bind=\"tableInfoPopupOptions\" class=\"tableinfo-popup\">\r\n    <dx-template name=\"contentTemplate\">\r\n      <div class=\"tableinfo-container\">\r\n        <div>\r\n          <div if.bind=\"!tableInfo.table.isView\">Tabelle: ${tableInfo.table.tableName}</div>\r\n          <div if.bind=\"tableInfo.table.isView\">View: ${tableInfo.table.tableName}</div>\r\n          <div if.bind=\"tableInfo.table.primaryKeyColumn\">Primärschlüssel: ${tableInfo.table.primaryKeyColumn}</div>\r\n        </div>\r\n        <div>\r\n          <div>\r\n            <dx-widget name=\"dxDataGrid\" options.bind=\"tableInfoGridOptions\"></dx-widget>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </dx-template>\r\n  </dx-widget>\r\n</template>"; });
define('text!resources/elements/table-selection/table-selection.html', ['module'], function(module) { module.exports = "<template class=\"table-selection\">  \r\n  <require from=\"./table-selection.css\"></require>\r\n\r\n  <div class=\"databases\">\r\n    <dx-widget name=\"dxSelectBox\" options.bind=\"databaseOptions\" class=\"database-select-box\"></dx-widget>\r\n  </div>\r\n  <div class=\"tables\">\r\n    <div class=\"tables-container\">\r\n      <dx-widget name=\"dxDataGrid\" options.bind=\"tableOptions\"></dx-widget>\r\n    </div>\r\n  </div>\r\n  \r\n  <table-information view-model.ref=\"tableInformationViewModel\"></table-information>\r\n</template>"; });
define('text!resources/elements/column-chooser/column-chooser.css', ['module'], function(module) { module.exports = ".columnchooser {\n  display: flex;\n  flex-direction: column;\n}\n.columnchooser > .columnchooser-tables {\n  background-color: #34495E;\n  padding: 5px;\n}\n.columnchooser > .columnchooser-tables .dx-selectbox {\n  border: none;\n}\n.columnchooser > .columnchooser-tables .dx-selectbox .dx-texteditor-container input {\n  color: lightgray;\n  background-color: #4f6f8f;\n}\n.columnchooser > .columnchooser-tables .dx-selectbox .dx-texteditor-container .dx-button-normal .dx-dropdowneditor-icon {\n  color: lightgray;\n}\n.columnchooser > .columnchooser-tables .dx-selectbox .dx-texteditor-container .dx-placeholder {\n  color: lightgray;\n}\n.columnchooser > .columnchooser-tables .dx-selectbox.dx-dropdowneditor.dx-state-hover .dx-dropdowneditor-icon {\n  background-color: #7795b4;\n}\n.columnchooser > .columnchooser-tables .dx-selectbox.dx-dropdowneditor.dx-dropdowneditor-active .dx-dropdowneditor-icon {\n  background-color: #587ca0;\n}\n.columnchooser > .columnchooser-columns {\n  flex-grow: 1;\n  position: relative;\n}\n.columnchooser > .columnchooser-columns > div {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid {\n  background-color: #EEEEEE;\n  color: gray;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-rowsview {\n  border-top: none;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel {\n  border-bottom: none;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-datagrid-search-panel {\n  border: none;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-datagrid-search-panel .dx-icon {\n  color: lightgray;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-datagrid-search-panel .dx-placeholder {\n  color: lightgray;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-datagrid-search-panel input {\n  color: lightgray;\n  background-color: #4f6f8f;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar {\n  height: 40px;\n  margin: 0;\n  padding: 0 5px;\n  background-color: #34495E;\n  box-sizing: border-box;\n  border-bottom: none;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-items-container {\n  height: 40px;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-items-container > div {\n  -webkit-border-horizontal-spacing: 0;\n  -webkit-border-vertical-spacing: 0;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-label {\n  color: lightgray;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-button {\n  border: 0;\n  background-color: transparent;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-button:hover {\n  background-color: #7795b4;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-button .dx-button-content {\n  display: flex;\n  align-items: center;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-button .dx-button-content i {\n  color: lightgray;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-texteditor {\n  border: none;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button {\n  background-color: #587ca0;\n  padding: 0;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-up-icon,\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-down-icon {\n  background-color: #7795b4;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-up-icon,\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-down-icon {\n  color: lightgray;\n}\n.columnchooser > .columnchooser-columns > div .dx-datagrid-header-panel .dx-toolbar .dx-texteditor input {\n  background-color: #4f6f8f;\n  color: lightgray;\n}\n"; });
define('text!resources/elements/container/container.css', ['module'], function(module) { module.exports = ".container {\n  display: flex;\n  height: 100%;\n}\n.container > .container-sidebar {\n  flex: 300px 0 0;\n  display: flex;\n  flex-direction: column;\n}\n.container > .container-sidebar > .container-table-selection {\n  position: relative;\n  flex-grow: 1;\n  overflow-y: hidden;\n}\n.container > .container-sidebar > .container-table-selection > div {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n}\n.container .container-buttons {\n  background-color: #34495E;\n}\n.container > .tables {\n  height: 100%;\n  width: 100%;\n  box-sizing: border-box;\n  overflow-y: scroll;\n  background-color: gray;\n}\n"; });
define('text!resources/elements/databases/databases.css', ['module'], function(module) { module.exports = ".databases-popup .dx-popup-normal {\n  border-radius: 0;\n  border: 0;\n}\n.databases-popup .dx-popup-normal.dx-state-focused.dx-overlay-content {\n  border: 0;\n}\n.databases-popup .dx-popup-normal .dx-popup-content {\n  padding: 0;\n}\n.databases-popup .dx-toolbar {\n  height: 50px;\n  margin: 0;\n  padding: 0 0;\n  background-color: #2C3E50;\n  box-sizing: border-box;\n  border-bottom: none;\n}\n.databases-popup .dx-toolbar .dx-toolbar-items-container {\n  height: 50px;\n}\n.databases-popup .dx-toolbar .dx-toolbar-items-container > div {\n  -webkit-border-horizontal-spacing: 0;\n  -webkit-border-vertical-spacing: 0;\n}\n.databases-popup .dx-toolbar .dx-toolbar-label {\n  color: white;\n}\n.databases-popup .dx-toolbar .dx-button {\n  border: 0;\n  background-color: transparent;\n  width: 50px;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n}\n.databases-popup .dx-toolbar .dx-button:hover {\n  background-color: #698aac;\n}\n.databases-popup .dx-toolbar .dx-button .dx-button-content {\n  display: flex;\n  align-items: center;\n}\n.databases-popup .dx-toolbar .dx-button .dx-button-content i {\n  color: white;\n}\n.databases-popup .dx-toolbar .dx-texteditor {\n  border: none;\n}\n.databases-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button {\n  background-color: #507192;\n  padding: 0;\n}\n.databases-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-up-icon,\n.databases-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-down-icon {\n  background-color: #698aac;\n}\n.databases-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-up-icon,\n.databases-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-down-icon {\n  color: white;\n}\n.databases-popup .dx-toolbar .dx-texteditor input {\n  background-color: #476481;\n  color: white;\n}\n.database-container {\n  height: 100%;\n  overflow-y: auto;\n}\n.database-container .databases-item {\n  padding: 5px 7px 5px 12px;\n}\n.database-container .databases-item > div {\n  display: flex;\n  align-items: center;\n  padding: 5px 0 5px 0;\n}\n.database-container .databases-item > div > div:first-child {\n  width: 145px;\n}\n.database-container .databases-item > div > div:nth-child(2) {\n  flex-grow: 1;\n}\n.database-container .databases-item > div > div {\n  margin-right: 5px;\n}\n"; });
define('text!resources/elements/editor/editor.css', ['module'], function(module) { module.exports = ".editor {\n  display: block;\n  height: 100%;\n  width: 100%;\n}\n"; });
define('text!resources/elements/find-column/find-column.css', ['module'], function(module) { module.exports = ".findcolumn-popup .dx-popup-normal {\n  border-radius: 0;\n  border: 0;\n}\n.findcolumn-popup .dx-popup-normal.dx-state-focused.dx-overlay-content {\n  border: 0;\n}\n.findcolumn-popup .dx-popup-normal .dx-popup-content {\n  padding: 0;\n}\n.findcolumn-popup .dx-toolbar {\n  height: 50px;\n  margin: 0;\n  padding: 0 0;\n  background-color: #2C3E50;\n  box-sizing: border-box;\n  border-bottom: none;\n}\n.findcolumn-popup .dx-toolbar .dx-toolbar-items-container {\n  height: 50px;\n}\n.findcolumn-popup .dx-toolbar .dx-toolbar-items-container > div {\n  -webkit-border-horizontal-spacing: 0;\n  -webkit-border-vertical-spacing: 0;\n}\n.findcolumn-popup .dx-toolbar .dx-toolbar-label {\n  color: white;\n}\n.findcolumn-popup .dx-toolbar .dx-button {\n  border: 0;\n  background-color: transparent;\n  width: 50px;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n}\n.findcolumn-popup .dx-toolbar .dx-button:hover {\n  background-color: #698aac;\n}\n.findcolumn-popup .dx-toolbar .dx-button .dx-button-content {\n  display: flex;\n  align-items: center;\n}\n.findcolumn-popup .dx-toolbar .dx-button .dx-button-content i {\n  color: white;\n}\n.findcolumn-popup .dx-toolbar .dx-texteditor {\n  border: none;\n}\n.findcolumn-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button {\n  background-color: #507192;\n  padding: 0;\n}\n.findcolumn-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-up-icon,\n.findcolumn-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-down-icon {\n  background-color: #698aac;\n}\n.findcolumn-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-up-icon,\n.findcolumn-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-down-icon {\n  color: white;\n}\n.findcolumn-popup .dx-toolbar .dx-texteditor input {\n  background-color: #476481;\n  color: white;\n}\n.findcolumn-container {\n  padding: 12px 5px;\n}\n"; });
define('text!resources/elements/statement-editor/statement-editor.css', ['module'], function(module) { module.exports = ".statementeditor-popup .dx-popup-normal {\n  border-radius: 0;\n  border: 0;\n}\n.statementeditor-popup .dx-popup-normal.dx-state-focused.dx-overlay-content {\n  border: 0;\n}\n.statementeditor-popup .dx-popup-normal .dx-popup-content {\n  padding: 0;\n}\n.statementeditor-popup .dx-toolbar {\n  height: 50px;\n  margin: 0;\n  padding: 0 0;\n  background-color: #2C3E50;\n  box-sizing: border-box;\n  border-bottom: none;\n}\n.statementeditor-popup .dx-toolbar .dx-toolbar-items-container {\n  height: 50px;\n}\n.statementeditor-popup .dx-toolbar .dx-toolbar-items-container > div {\n  -webkit-border-horizontal-spacing: 0;\n  -webkit-border-vertical-spacing: 0;\n}\n.statementeditor-popup .dx-toolbar .dx-toolbar-label {\n  color: white;\n}\n.statementeditor-popup .dx-toolbar .dx-button {\n  border: 0;\n  background-color: transparent;\n  width: 50px;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n}\n.statementeditor-popup .dx-toolbar .dx-button:hover {\n  background-color: #698aac;\n}\n.statementeditor-popup .dx-toolbar .dx-button .dx-button-content {\n  display: flex;\n  align-items: center;\n}\n.statementeditor-popup .dx-toolbar .dx-button .dx-button-content i {\n  color: white;\n}\n.statementeditor-popup .dx-toolbar .dx-texteditor {\n  border: none;\n}\n.statementeditor-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button {\n  background-color: #507192;\n  padding: 0;\n}\n.statementeditor-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-up-icon,\n.statementeditor-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-down-icon {\n  background-color: #698aac;\n}\n.statementeditor-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-up-icon,\n.statementeditor-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-down-icon {\n  color: white;\n}\n.statementeditor-popup .dx-toolbar .dx-texteditor input {\n  background-color: #476481;\n  color: white;\n}\n.statementeditor-container {\n  display: flex;\n  height: 100%;\n}\n.statementeditor-container > .statementeditor-table-selection {\n  flex: 300px 0 0;\n}\n.statementeditor-container > .statementeditor {\n  height: 100%;\n  width: 100%;\n}\n.statementeditor-container > .statementeditor-columnchooser {\n  flex: 300px 0 0;\n  position: relative;\n}\n"; });
define('text!resources/elements/table/table.css', ['module'], function(module) { module.exports = ".table {\n  display: block;\n  padding: 0 5px;\n  box-sizing: border-box;\n}\n.table > * {\n  max-width: 100% !important;\n}\n.table > * > .dx-datagrid {\n  box-sizing: border-box;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel {\n  border: none;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-datagrid-search-panel {\n  border: none;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-datagrid-search-panel .dx-icon {\n  color: lightgray;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-datagrid-search-panel .dx-placeholder {\n  color: lightgray;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-datagrid-search-panel input {\n  color: lightgray;\n  background-color: #4f6f8f;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar {\n  height: 40px;\n  margin: 0;\n  padding: 0 0;\n  background-color: #2C3E50;\n  box-sizing: border-box;\n  border-bottom: none;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-items-container {\n  height: 40px;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-items-container > div {\n  -webkit-border-horizontal-spacing: 0;\n  -webkit-border-vertical-spacing: 0;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-label {\n  color: white;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-button {\n  border: 0;\n  background-color: transparent;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-button:hover {\n  background-color: #698aac;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-button .dx-button-content {\n  display: flex;\n  align-items: center;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-button .dx-button-content i {\n  color: white;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-texteditor {\n  border: none;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button {\n  background-color: #507192;\n  padding: 0;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-up-icon,\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-down-icon {\n  background-color: #698aac;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-up-icon,\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-down-icon {\n  color: white;\n}\n.table > * > .dx-datagrid .dx-datagrid-header-panel .dx-toolbar .dx-texteditor input {\n  background-color: #476481;\n  color: white;\n}\n.table .table-no-all-rows-loaded {\n  color: white;\n  background-color: red;\n  height: 30px;\n  width: 30px;\n  line-height: 30px;\n  border-radius: 30px;\n  margin: 5px;\n  text-align: center;\n  font-size: 14px;\n}\n"; });
define('text!resources/elements/table-selection/table-selection.css', ['module'], function(module) { module.exports = ".table-selection {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  box-sizing: border-box;\n  background-color: gray;\n}\n.table-selection > .databases {\n  background-color: #34495E;\n  padding: 5px;\n}\n.table-selection > .databases .dx-selectbox {\n  border: none;\n}\n.table-selection > .databases .dx-selectbox .dx-texteditor-container input {\n  color: lightgray;\n  background-color: #4f6f8f;\n}\n.table-selection > .databases .dx-selectbox .dx-texteditor-container .dx-button-normal .dx-dropdowneditor-icon {\n  color: lightgray;\n}\n.table-selection > .databases .dx-selectbox .dx-texteditor-container .dx-placeholder {\n  color: lightgray;\n}\n.table-selection > .databases .dx-selectbox.dx-dropdowneditor.dx-state-hover .dx-dropdowneditor-icon {\n  background-color: #7795b4;\n}\n.table-selection > .databases .dx-selectbox.dx-dropdowneditor.dx-dropdowneditor-active .dx-dropdowneditor-icon {\n  background-color: #587ca0;\n}\n.table-selection > .tables {\n  box-sizing: border-box;\n  flex-grow: 1;\n  position: relative;\n}\n.table-selection > .tables .tables-container {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n}\n.table-selection > .tables .dx-datagrid {\n  background-color: #EEEEEE;\n  color: gray;\n}\n.table-selection > .tables .dx-datagrid-rowsview {\n  border-top: none;\n}\n.table-selection > .tables .dx-datagrid-header-panel {\n  border-bottom: none;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-datagrid-search-panel {\n  border: none;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-datagrid-search-panel .dx-icon {\n  color: lightgray;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-datagrid-search-panel .dx-placeholder {\n  color: lightgray;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-datagrid-search-panel input {\n  color: lightgray;\n  background-color: #4f6f8f;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar {\n  height: 40px;\n  margin: 0;\n  padding: 0 5px;\n  background-color: #34495E;\n  box-sizing: border-box;\n  border-bottom: none;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-items-container {\n  height: 40px;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-items-container > div {\n  -webkit-border-horizontal-spacing: 0;\n  -webkit-border-vertical-spacing: 0;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-label {\n  color: lightgray;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-button {\n  border: 0;\n  background-color: transparent;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-button:hover {\n  background-color: #7795b4;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-button .dx-button-content {\n  display: flex;\n  align-items: center;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-button .dx-button-content i {\n  color: lightgray;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-texteditor {\n  border: none;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button {\n  background-color: #587ca0;\n  padding: 0;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-up-icon,\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-down-icon {\n  background-color: #7795b4;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-up-icon,\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-down-icon {\n  color: lightgray;\n}\n.table-selection > .tables .dx-datagrid-header-panel .dx-toolbar .dx-texteditor input {\n  background-color: #4f6f8f;\n  color: lightgray;\n}\n.tableinfo-popup .dx-popup-normal {\n  border-radius: 0;\n  border: 0;\n}\n.tableinfo-popup .dx-popup-normal.dx-state-focused.dx-overlay-content {\n  border: 0;\n}\n.tableinfo-popup .dx-popup-normal .dx-popup-content {\n  padding: 0;\n}\n.tableinfo-popup .dx-toolbar {\n  height: 50px;\n  margin: 0;\n  padding: 0 0;\n  background-color: #2C3E50;\n  box-sizing: border-box;\n  border-bottom: none;\n}\n.tableinfo-popup .dx-toolbar .dx-toolbar-items-container {\n  height: 50px;\n}\n.tableinfo-popup .dx-toolbar .dx-toolbar-items-container > div {\n  -webkit-border-horizontal-spacing: 0;\n  -webkit-border-vertical-spacing: 0;\n}\n.tableinfo-popup .dx-toolbar .dx-toolbar-label {\n  color: white;\n}\n.tableinfo-popup .dx-toolbar .dx-button {\n  border: 0;\n  background-color: transparent;\n  width: 50px;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n}\n.tableinfo-popup .dx-toolbar .dx-button:hover {\n  background-color: #698aac;\n}\n.tableinfo-popup .dx-toolbar .dx-button .dx-button-content {\n  display: flex;\n  align-items: center;\n}\n.tableinfo-popup .dx-toolbar .dx-button .dx-button-content i {\n  color: white;\n}\n.tableinfo-popup .dx-toolbar .dx-texteditor {\n  border: none;\n}\n.tableinfo-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button {\n  background-color: #507192;\n  padding: 0;\n}\n.tableinfo-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-up-icon,\n.tableinfo-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button.dx-state-hover .dx-numberbox-spin-down-icon {\n  background-color: #698aac;\n}\n.tableinfo-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-up-icon,\n.tableinfo-popup .dx-toolbar .dx-texteditor .dx-texteditor-buttons-container .dx-numberbox-spin-button .dx-numberbox-spin-down-icon {\n  color: white;\n}\n.tableinfo-popup .dx-toolbar .dx-texteditor input {\n  background-color: #476481;\n  color: white;\n}\n.tableinfo-container {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.tableinfo-container > div:first-child {\n  padding: 12px 5px;\n  font-weight: bold;\n}\n.tableinfo-container > div:last-child {\n  position: relative;\n  flex-grow: 1;\n}\n.tableinfo-container > div:last-child > div {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n}\n"; });
//# sourceMappingURL=app-bundle.js.map