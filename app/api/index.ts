export interface ErrorResult {
  message: string
}

export interface Result {
  error: ErrorResult
  data: any
}

export interface Picture {
  copyright: string
  date: string //YYYY-MM-DD
  explanation: string
  hdurl: URL
  url: URL
  media_type: string
  service_version: string
  title: string
}

export interface PicturesResult extends Result {
  data: Picture[]
}

export function initPicturesResult(): PicturesResult {
  return {
    error: { message: '' },
    data: [],
  }
}
export function initResult(): Result {
  return {
    error: { message: '' },
    data: {},
  }
}
