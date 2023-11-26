import { Picture } from '@/types'

import prisma from '@/lib/db'
import { log } from '@logtail/next'
/* To allow a BigInt to be JSON.stringify'd */
require('@/lib/bigint-tojson')

class PictureDAO {
  static saveOrUpdate: (picture: Picture) => {}
  static like: (picture: Picture, userId: number) => {}
  static findOneByDate: () => {}
}
