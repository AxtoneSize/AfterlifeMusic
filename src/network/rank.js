import {request} from "./request"

export function getTopList() {
  return request({
    url: '/toplist'
  }) 
}

export function getMusicList(id) {
  return request({
    url: `/top/list?id=${id}`
  })
}