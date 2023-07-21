import { authToken } from 'electric-sql/auth'
import { ElectricDatabase, electrify } from 'electric-sql/wa-sqlite'
import { Electric, schema } from './generated/client'
import { makeElectricContext } from 'electric-sql/react'

export const { ElectricProvider, useElectric } = makeElectricContext<Electric>()

export const initElectric = async () => {
  const conn = await ElectricDatabase.init('intro.db', '/')

  const config = {
    auth: {
      token: await authToken(
        'electric.com',
        'local-development-key-minimum-32-symbols'
      ),
    },
    debug: true,
  }

  console.log(config)

  return electrify(conn, schema, config)
}
