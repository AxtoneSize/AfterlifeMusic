import {request} from "./request"

export function getLyric(id) {
  return request({
    url: `/lyric?id=${id}`
  })
}