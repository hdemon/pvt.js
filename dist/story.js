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
  function Story(storyInfo) {
    _classCallCheck(this, Story);

    if (storyInfo) this.setProperties(storyInfo);
  }

  // example
  //
  // { kind: 'story',
  //   id: 100929808,
  //   created_at: '2015-08-10T13:02:36Z',
  //   updated_at: '2015-08-10T13:03:15Z',
  //   estimate: 1,
  //   story_type: 'feature',
  //   name: 'test3',
  //   current_state: 'started',
  //   requested_by_id: 599469,
  //   project_id: 498821,
  //   url: 'https://www.pivotaltracker.com/story/show/100929808',
  //   owner_ids: [ 599469 ],
  //   labels: [],
  //   owned_by_id: 599469 }

  _createClass(Story, [{
    key: "update",
    value: function update() {}
  }, {
    key: "save",
    value: function save() {
      var _this = this;

      var request = Story._requestObject();
      request.method = "POST";
      request.data = this;

      return new Promise(function (resolve, reject) {
        return (0, _axios2["default"])(request).then(function (response) {
          resolve(_this);
        })["catch"](reject);
      });
    }
  }, {
    key: "setProperties",
    value: function setProperties(properties) {
      this.kind = properties.kind || "";
      this.id = Number(properties.id) || null;
      this.project_id = Number(properties.project_id);
      this.name = properties.name;
      this.story_type = properties.story_type;
      this.current_state = properties.current_state;
      this.estimate = Number(properties.estimate) || null;
      this.requested_by_id = Number(properties.requested_by_id);
      this.owner_ids = properties.owner_ids || [];
      this.labels = properties.labels || [];
      this.created_at = properties.created_at;
      this.updated_at = properties.updated_at;
      this.url = properties.url;
    }
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
          resolve(stories);
        })["catch"](reject);
      });
    }
  }, {
    key: "fetch",
    value: function fetch(id) {
      var _this3 = this;

      var request = Story._requestObject();
      request.method = "GET";
      request.url += "/" + id;

      return new Promise(function (resolve, reject) {
        return (0, _axios2["default"])(request).then(function (response) {
          resolve(new _this3(response.data));
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
      var _this4 = this;

      return storyInfoArray.map(function (storyInfo) {
        return new _this4(storyInfo);
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