import axios from "axios"

export default class Story {
  constructor(info) {
    Object.getOwnPropertyNames(info).forEach((property) => { this[property] = info[property] })
  }

  fetch() {

  }

  update() {

  }

  save() {

  }

  static set(metaInfo) {
    this.projectId = metaInfo.projectId
    this.token = metaInfo.token
  }

  static getList(parameters) { // see https://www.pivotaltracker.com/help/api/rest/v5#projects_project_id_stories_get
    let request = this._requestObject()
    request.method = "GET"
    request.url += "?" + this._parametersToString(parameters)

    return new Promise( (resolve, reject) => {
      axios(request)
        .then((response) => {
          let stories = this._createStoriesFrom(response.data)
          resolve(this._createStoriesFrom(response.data))
        }).catch(reject)
    })
  }

  static _requestObject() {
    return {
      url: `https://www.pivotaltracker.com/services/v5/projects/${this.projectId}/stories`,
      protocol: "https",
      headers: {
        "X-TrackerToken": this.token,
        "Content-Type": "application/json",
      },
      transformRequest: [function (data) {
        return JSON.stringify(data)
      }],
    }
  }

  static _createStoriesFrom(storyInfoArray) {
    return storyInfoArray.map((storyInfo) => { return new this(storyInfo) })
  }

  static _parametersToString(parameters) {
    return Object.getOwnPropertyNames(parameters).map((key) => { return `${key}=${parameters[key]}` }).join("&")
  }
}
