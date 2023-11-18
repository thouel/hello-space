require('dotenv').config()

interface NasaApiProps {
  method: string
  url: string
  secret: string | undefined
}

export default class NasaApiClient {
  private props: NasaApiProps = {
    method: 'GET',
    url: 'https://api.nasa.gov/planetary/apod',
    secret: process.env.NASA_API_SECRET,
  }

  constructor() {
    if (this.props.secret === undefined || this.props.secret === '') {
      throw new Error('NASA_API_SECRET env var not defined')
    }
  }

  private buildQuery(startDate: Date, endDate: Date): string {
    const searchParams: URLSearchParams = new URLSearchParams()
    searchParams.append('api_key', this.props.secret ?? '')
    searchParams.append('start_date', this.formatDate(startDate))
    searchParams.append('end_date', this.formatDate(endDate))
    const url = new URL(this.props.url)
    url.search = searchParams.toString()
    return url.toString()
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  async fetchRange(startDate: Date, endDate: Date): Promise<any> {
    const url: string = this.buildQuery(startDate, endDate)
    console.log('calling', { url })
    try {
      return await fetch(url, { method: this.props.method })
    } catch (e) {
      throw e
    }
  }
}
