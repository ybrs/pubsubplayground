import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import broker from './broker'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// you can mix with vanilla js with react 
broker.subscribe("countUpdated", (event)=>{
  const el = document.getElementById("counter");  
  if (!el){
    return
  }
  el.innerHTML = event;
})