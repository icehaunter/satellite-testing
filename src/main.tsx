import React from 'react'
import ReactDOM from 'react-dom/client'
import ElectricSetup from './ElectricSetup.tsx'
import RealtimeExample from './RealtimeExample.tsx'
import './index.css'
// import * as waSqliteWasm from "wa-sqlite/dist/wa-sqlite-async.wasm";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="px-3 md:px-4">
        <ElectricSetup dbName="user1" demoName="multi-user" bootstrapItems={2}>
          <RealtimeExample userId={1} itemColor="text-green-400" />
        </ElectricSetup>
      </div>
      {/* <div className="px-3 md:px-4">
        <ElectricSetup dbName="user2" demoName="multi-user" bootstrapItems={2}>
          <RealtimeExample userId={2} itemColor="text-purple-400" />
        </ElectricSetup>
      </div> */}
    </div>
  </React.StrictMode>,
)
