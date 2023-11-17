export async function GET({ params }) {
  const { day } = params
  console.log(`GET /api/p/[${day}]`)
  // const res = await ShowTMDB().fetchOne(showType, externalId)
  // console.log(`GET /api/show/${showType}/${externalId}`, { res })
  // console.log(`GET /api/p/[${day}]`, {res})
  return NextResponse.json({ status: 'ok' })
  // return NextResponse.json(res, { status: res.error?.message ? 400 : 200 })
}
