import { log } from '@logtail/next'

export function isTokenAuthorized(token: string) {
  log.info(
    `'isTokenAuth env=${process.env.APP_TOKEN}, rcvd=${token}, test=${
      process.env.APP_TOKEN === token
    }`,
  )
  return process.env.APP_TOKEN === token
}

export function getBaseUrl() {
  // if window is not undefined, we are running in the browser env (client side)
  if (typeof window !== 'undefined') return ''

  var res = ''

  const vc = process.env.VERCEL_URL
  log.debug('getBaseUrl', { vc })
  if (vc) {
    res = `https://${vc}`
  } else {
    res = `${process.env.LOCAL_URL}`
  }
  log.debug('getBaseUrl', { res })
  return res
}

export function strToDate(str: string): Date {
  // Split the string into an array of [year, month, day]
  const [year, month, day] = str.split('-')

  // Create a new Date object using the components
  const dateObject = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
  )

  return dateObject
}

export function displayDate(str: string): string {
  const [year, month, day] = str.split('-')
  return `${month}/${day}/${year}`
}
