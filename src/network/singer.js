import {request} from "./request"

export function getSingerList() {
  return request({
    url: 'toplist/artist'
  })
}

export function getSingerDetail(id) {
  return request({
    url: `/artists?id=${id}`
  })
}