/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'
import { FormData } from '../models'

const endpoint = process.env.REACT_APP_API_ENDPOINT
const getResponseData = ({ data }: AxiosResponse<any>): any => data

axios.defaults.withCredentials = true

export const postUser = (params: { userCd: string | null | false }): any => {
  return axios.post(`${endpoint}/user`, params).then(getResponseData)
}

export const putUser = (params: { userCd: string | null | false }): any => {
  return axios.put(`${endpoint}/user`, params).then(getResponseData)
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
