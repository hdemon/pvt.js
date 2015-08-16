import axios from "axios"

export default class Story {
  constructor(storyInfo) {
    this.data = {


    }
    if (storyInfo) this.setProperties(storyInfo)
    Object.getOwnPropertyNames(storyInfo).map((key) => {
      this[key] = this.data[key]
    })
  }

  update() {

  }

  setProperties(properties) {
    if (properties.kind) this.data.kind = properties.kind || ""
    if (properties.id) this.data.id = Number(properties.id) || null
    if (properties.project_id) this.data.project_id = Number(properties.project_id)
    if (properties.name) this.data.name = properties.name
    if (properties.story_type) this.data.story_type = properties.story_type || "feature"
    if (properties.current_state) this.data.current_state = properties.current_state
    if (properties.estimate) this.data.estimate = Number(properties.estimate) || null
    if (properties.requested_by_id) this.data.requested_by_id = Number(properties.requested_by_id)
    if (properties.owner_ids) this.data.owner_ids = properties.owner_ids || []
    if (properties.labels) this.data.labels = properties.labels || []
    if (properties.created_at) this.data.created_at = properties.created_at
    if (properties.updated_at) this.data.updated_at = properties.updated_at
    if (properties.url) this.data.url = properties.url
  }

  static setMetaInfo(metaInfo) {
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
          resolve(new this(response.data))
        }).catch(reject)
    })
  }

  static save(storyInfo) {
    let instance = new Story(storyInfo)
    let request = Story._requestObject()
    request.method = "POST"
    request.data = instance.data

    return new Promise( (resolve, reject) => {
      return axios(request)
        .then((response) => {
          instance.setProperties(response.data)
          console.log(response.data);
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
      return new this(storyInfo)
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
