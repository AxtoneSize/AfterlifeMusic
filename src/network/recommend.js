import {request} from "./request"

export function getRecommend() {
  return request({
    url: '/banner?type=2'
  })
}

export function getDiscList() {
  return request({
    url: '/top/playlist/highquality'
  })
}

export function getSongList(id) {
  return request({
    url: `/playlist/detail?id=${id}`
  })
} 
