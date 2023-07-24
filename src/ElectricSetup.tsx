import { useEffect, useState, PropsWithChildren } from 'react'
import { genUUID } from 'electric-sql/util'

import {
  DemoContext,
  DemoContextData,
  getOrCreateSession,
  getOrCreateDemo,
} from './utils/models'

import { initElectric, ElectricProvider, Electric } from './electric'
import { getOrSetTabId } from './utils/tab'

function App({
  children,
  demoName,
  bootstrapItems,
  dbName,
}: PropsWithChildren<{
  demoName: string
  bootstrapItems: number
  dbName: string
}>) {
  const [electric, setElectric] = useState<Electric>()
  const [demoContext, setDemoContext] = useState<DemoContextData>()

  useEffect(() => {
    console.warn('USE EFFECT CALLED IN APP')
    let shouldStop = false
    const tabId = getOrSetTabId()
    const tabScopedDbName = `${dbName}-${tabId}.db`

    const init = async () => {
      if (shouldStop) return

      const Electric = await initElectric(tabScopedDbName)

      console.log('establish shape subscription')
      const shape = await Electric.db.sessions.sync({
        include: {
          demos: {
            include: {
              sliders: true,
              items: true,
            },
          },
        },
      })
      console.log('shape subscription established')

      console.log('awaiting shape sync')
      await shape.synced
      console.log('shape synced')

      if (shouldStop) return

      console.log('getOrCreateSession')
      const session = await getOrCreateSession(Electric.db, genUUID())
      console.log('session', session)

      console.log('getOrCreateDemo')
      const demo = await getOrCreateDemo(
        Electric.db,
        session,
        demoName,
        bootstrapItems,
      )
      console.log('demo', demo)

      setDemoContext({ demo: demo, session: session })
      setElectric(Electric)
      ;(window as any)['Electric' + demoName] = Electric
    }

    init()

    return () => {
      console.log('cleanup called')
      shouldStop = true
    }
  }, [])

  return (
    <ElectricProvider db={electric}>
      <DemoContext.Provider value={demoContext}>
        {electric && demoContext ? children : []}
      </DemoContext.Provider>
    </ElectricProvider>
  )
}

export default App
