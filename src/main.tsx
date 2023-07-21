// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import * as waSqliteWasm from "wa-sqlite/dist/wa-sqlite-async.wasm";
import { initElectric, ElectricProvider } from './electric.ts'

const db = await initElectric()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ElectricProvider db={db}>
    <App />
  </ElectricProvider>
  // </React.StrictMode>,
)
