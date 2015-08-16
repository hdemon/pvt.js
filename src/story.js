import axios from "axios"
import _ from "lodash"

export default class Story {
  constructor(storyInfo) {
    this.kind = storyInfo.kind || 'story'
    this.id = storyInfo.id || null
    this.created_at = storyInfo.created_at || null
    this.updated_at = storyInfo.updated_at || null
    this.estimate = Number(storyInfo.estimate) || null
    this.story_type = storyInfo.story_type || 'feature'
    this.name = storyInfo.name
    this.current_state = storyInfo.current_state || 'started'
    this.requested_by_id = Number(storyInfo.requested_by_id) || null
    this.project_id = Number(storyInfo.project_id) || null
    this.url = storyInfo.url || null
    this.owner_ids = storyInfo.owner_ids || []
    this.labels = storyInfo.labels || []
    this.owned_by_id = storyInfo.owned_by_id || null
  }

  update() {

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
    request.data = _.omit(instance, (value) => { return _.isNull(value) || value.length === 0 })

    return new Promise( (resolve, reject) => {
      return axios(request)
        .then((response) => {
          resolve(new this(response.data))
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
      transformRequest: [function(data) {
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
