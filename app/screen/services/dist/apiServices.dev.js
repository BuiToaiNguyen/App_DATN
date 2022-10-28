"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GLOBAL_API = {
  requestPOST_WSO2: function requestPOST_WSO2(urlService, tokenBearer, data) {
    return regeneratorRuntime.async(function requestPOST_WSO2$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_axios["default"].post(urlService, data, {
              headers: {
                Authorization: 'Bearer ' + tokenBearer
              }
            }).then(function (response) {
              return response.data;
            })["catch"](function (error) {
              console.log(error);
              return {
                data: null
              };
            }));

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  requestPOST: function requestPOST(urlService, data) {
    return regeneratorRuntime.async(function requestPOST$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_axios["default"].post(urlService, data).then(function (response) {
              return response.data;
            })["catch"](function (error) {
              console.log(error);
              return {
                data: null
              };
            }));

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  requestPOSTRoot: function requestPOSTRoot(urlService, data) {
    return regeneratorRuntime.async(function requestPOSTRoot$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_axios["default"].post(urlService, data, {
              headers: {
                tenant: 'root',
                'Content-Type': 'application/json'
              }
            }).then(function (response) {
              return response.data;
            })["catch"](function (error) {
              console.log(error);
              return {
                data: null
              };
            }));

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  requestGET: function requestGET(urlService) {
    return regeneratorRuntime.async(function requestGET$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_axios["default"].get(urlService).then(function (response) {
              return response.data;
            })["catch"](function (error) {
              console.log(error);
              return {
                data: null
              };
            }));

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    });
  }
};
var _default = GLOBAL_API;
exports["default"] = _default;