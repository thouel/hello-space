// scripts/teardown.js
const { PrismaClient } = require('@prisma/client')

export interface TeardownProps {
  dropDB: boolean
}

async function teardown() {
  const prisma = new PrismaClient()
  const res: TeardownProps = { dropDB: false }
  try {
    res.dropDB = await prisma.$runCommandRaw({ dropDatabase: 1 })
  } catch (error) {
    console.error('Teardown error:', error)
  } finally {
    await prisma.$disconnect()
  }
  return res
}

module.exports = teardown
