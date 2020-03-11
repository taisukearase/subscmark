/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'
import { FormData } from '../models'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://subscmark.netlify.com'
axios.defaults.headers.Accept = 'application/json'

const endpoint = 'https://so88ofhp4e.execute-api.ap-northeast-1.amazonaws.com'
const getResponseData = ({ data }: AxiosResponse<any>): any => data

export const getBookmarks = (): any => {
  return axios.get(`${endpoint}/bookmarks`, { withCredentials: true }).then(getResponseData)
}

export const postBookmarks = (params: FormData): any => {
  return axios.post(`${endpoint}/bookmarks`, params).then(getResponseData)
}

export const putBookmarks = (params: FormData): any => {
  return axios.put(`${endpoint}/bookmarks`, params).then(getResponseData)
}

export const putBookmarksReadTime = (params: { id: number; lastReadTime: string }): any => {
  return axios.put(`${endpoint}/bookmarks`, params).then(getResponseData)
}

export const deleteBookmarks = (id: number): any => {
  return axios.delete(`${endpoint}/bookmarks`, { data: { id } }).then(getResponseData)
}

export default null
