import { getLyric } from 'network/song'

export default class Song {
  constructor({id, singer, name, album, duration, image, url}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.id).then(res => {
        if(res.code === 200) {
          this.lyric = res.lrc.lyric
          resolve(this.lyric)
        } else {
          reject('noo lyric')
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    duration: musicData.dt,
    image: musicData.al.picUrl,
    url: `https://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}