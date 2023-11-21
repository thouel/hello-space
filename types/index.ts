export type Picture = {
  copyright: string
  date: string //YYYY-MM-DD
  explanation: string
  hdurl: URL
  url: URL
  media_type: string
  service_version: string
  title: string
}

export class PicturesResult {
  message: string
  data: Picture[]
  isError: boolean

  constructor() {
    this.message = ''
    this.data = []
    this.isError = false
  }
}
