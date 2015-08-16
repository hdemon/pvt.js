import axios from "axios"

export default class Story {
  constructor(storyInfo) {
  }

  update() {

  }

  save() {
    let request = Story._requestObject()
    request.method = "POST"
    request.data = this

    return new Promise( (resolve, reject) => {
      return axios(request)
        .then((response) => {
          resolve(this)
        }).catch(reject)
    })
  }

  setProperties(properties) {
    this.kind = properties.kind || ""
    this.id = Number(properties.id) || null
    this.project_id = Number(properties.project_id)
    this.name = properties.name
    this.story_type = properties.story_type
    this.current_state = properties.current_state
    this.estimate = Number(properties.estimate) || null
    this.requested_by_id = Number(properties.requested_by_id)
    this.owner_ids = properties.owner_ids || []
    this.labels = properties.labels || []
    this.created_at = properties.created_at
    this.updated_at = properties.updated_at
    this.url = properties.url
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
          resolve(stories)
        }).catch(reject)
    })
  }

  static fetch(id) {
    let request = Story._requestObject()
    request.method = "GET"
    request.url += "/" + id

    return new Promise( (resolve, reject) => {
      return axios(request)
        .then((response) => {
          let instance = new this()
          instance.setProperties(response.data)
          resolve(instance)
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
    return storyInfoArray.map((storyInfo) => {
      let instance = new this()
      instance.setProperties(storyInfo)
      return instance
    })
  }

  static _parametersToString(parameters) {
    return Object.getOwnPropertyNames(parameters).map((key) => { return `${key}=${parameters[key]}` }).join("&")
  }
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
