"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var Story = (function () {
  function Story(info) {
    var _this = this;

    _classCallCheck(this, Story);

    Object.getOwnPropertyNames(info).forEach(function (property) {
      _this[property] = info[property];
    });
  }

  _createClass(Story, [{
    key: "fetch",
    value: function fetch() {}
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "save",
    value: function save() {}
  }], [{
    key: "set",
    value: function set(metaInfo) {
      this.projectId = metaInfo.projectId;
      this.token = metaInfo.token;
    }
  }, {
    key: "getList",
    value: function getList(parameters) {
      var _this2 = this;

      // see https://www.pivotaltracker.com/help/api/rest/v5#projects_project_id_stories_get
      var request = this._requestObject();
      request.method = "GET";
      request.url += "?" + this._parametersToString(parameters);

      return new Promise(function (resolve, reject) {
        (0, _axios2["default"])(request).then(function (response) {
          var stories = _this2._createStoriesFrom(response.data);
          resolve(_this2._createStoriesFrom(response.data));
        })["catch"](reject);
      });
    }
  }, {
    key: "_requestObject",
    value: function _requestObject() {
      return {
        url: "https://www.pivotaltracker.com/services/v5/projects/" + this.projectId + "/stories",
        protocol: "https",
        headers: {
          "X-TrackerToken": this.token,
          "Content-Type": "application/json"
        },
        transformRequest: [function (data) {
          return JSON.stringify(data);
        }]
      };
    }
  }, {
    key: "_createStoriesFrom",
    value: function _createStoriesFrom(storyInfoArray) {
      var _this3 = this;

      return storyInfoArray.map(function (storyInfo) {
        return new _this3(storyInfo);
      });
    }
  }, {
    key: "_parametersToString",
    value: function _parametersToString(parameters) {
      return Object.getOwnPropertyNames(parameters).map(function (key) {
        return key + "=" + parameters[key];
      }).join("&");
    }
  }]);

  return Story;
})();

exports["default"] = Story;
module.exports = exports["default"];