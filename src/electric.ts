import { authToken } from 'electric-sql/auth'
import { ElectricDatabase, electrify } from 'electric-sql/wa-sqlite'
import { Electric, schema } from './generated/client'
import { makeElectricContext } from 'electric-sql/react'

export type {
  Electric,
  demos as Demo,
  items as Item,
  players as Player,
  sessions as Session,
  sliders as Slider,
  tournaments as Tournament,
  users as User,
} from './generated/client'

export type DB = Electric['db']

export const { ElectricProvider, useElectric } = makeElectricContext<Electric>()

export const initElectric = async (dbName = 'intro.db') => {
  const conn = await ElectricDatabase.init(dbName, '/')

  const config = {
    auth: {
      token: await authToken(
        'electric.com',
        'local-development-key-minimum-32-symbols',
      ),
    },
    debug: true,
  }

  console.log(config)

  return electrify(conn, schema, config)
}
