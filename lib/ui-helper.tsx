export const isTokenAuthorized = (token: string) => {
  return process.env.APP_TOKEN === token
}

export const getBaseUrl = () => {
  // if window is not undefined, we are running in the browser env (client side)
  if (typeof window !== 'undefined') return ''

  var res = ''

  const vc = process.env.VERCEL_URL
  if (vc) {
    res = `https://${vc}`
  } else {
    res = `${process.env.LOCAL_URL}`
  }
  return res
}
