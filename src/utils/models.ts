import { createContext, useContext } from 'react'
import type { DB, Demo, Session, User } from '../electric'
import cache from './cache'
import { genUUID } from 'electric-sql/util'

const SESSION_ID_KEY = 'electric.intro.session:session_id'
const SESSION_TTL = 1_000 * 60 * 60 * 24 // 1 day

export type DemoContextData = {
  demo: Demo
  session: Session
  user?: User
}

export const DemoContext = createContext<DemoContextData | undefined>(undefined)

export const useDemoContext = () => {
  return useContext(DemoContext)
}

/*
 * We look for the session in the query string. If it's not there,
 * we check the cache or create a new one. This allows us to both
 * persist the demo state across page loads and provide dyanmic
 * links to share the same session.
 */
export async function getOrCreateSession(db: DB, defaultSessionId: string) {
  console.log('getOrCreateSession', db, defaultSessionId)

  const sessionId = getOrCreateSessionId(defaultSessionId)
  console.log('sessionId', sessionId)

  console.log('find existingSession')
  const existingSession = await db.sessions.findUnique({
    where: {
      id: sessionId,
    },
  })
  console.log('existingSession', existingSession)

  if (existingSession !== null) {
    return existingSession
  }

  console.log('create newSession')
  const newSession = await db.sessions.create({
    data: {
      id: sessionId,
      inserted_at: `${Date.now()}`,
    },
  })
  console.log('newSession', newSession)

  return newSession
}

export const getOrCreateSessionId = (defaultSessionId: string) => {
  let sessionId

  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.has('sessionId')) {
    sessionId = urlParams.get('sessionId')

    cache.set(SESSION_ID_KEY, sessionId, SESSION_TTL)
  } else {
    sessionId = cache.get(SESSION_ID_KEY)

    if (sessionId === null) {
      sessionId = defaultSessionId

      cache.set(SESSION_ID_KEY, sessionId, SESSION_TTL)
    }
  }

  return sessionId
}

export async function getOrCreateDemo(
  db: DB,
  session: Session,
  name: string,
  bootstrapItems?: number,
) {
  const existingDemo = await db.demos.findFirst({
    where: {
      name: name,
      session_id: session.id,
    },
  })

  if (existingDemo !== null) {
    return existingDemo
  }

  // Usign a deterministic rather than a random ID for the `demo`
  // instance allows us to instantiate two seperate apps side by
  // side in the page that use different local databases.
  const demoId = `${session.id}:${name}`
  const newDemo = await db.demos.create({
    data: {
      id: demoId,
      name: name,
      session_id: session.id,
    },
  })

  if (bootstrapItems) {
    const items = []
    const t1 = Date.now()

    for (let i = 0; i < bootstrapItems; i++) {
      items.push({
        id: genUUID(),
        inserted_at: `${t1 + i}`,
        demo_id: newDemo.id,
      })
    }

    await db.items.createMany({
      data: items,
    })
  }

  return newDemo
}
