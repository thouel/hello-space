export type Picture = {
  copyright: string
  date: string //YYYY-MM-DD
  explanation: string
  hdurl: string
  url: string
  media_type: string
  service_version: string
  title: string
}

export type PicturesResult = {
  message: string
  data: Picture[]
  isError: boolean
}

export type PictureResult = {
  message: string
  data: Picture | null
  isError: boolean
}
