export interface ErrorResult {
  message: string
}

export interface Result {
  status: number
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
    status: 200,
    error: { message: '' },
    data: [],
  }
}
export function initResult(): Result {
  return {
    status: 200,
    error: { message: '' },
    data: {},
  }
}
