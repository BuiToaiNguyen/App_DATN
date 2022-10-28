"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GLOBAL_DATA = void 0;

var _reactNativeConfig = _interopRequireDefault(require("react-native-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GLOBAL_DATA = {
  REACT_APP_URL: _reactNativeConfig["default"].REACT_APP_URL
};
exports.GLOBAL_DATA = GLOBAL_DATA;