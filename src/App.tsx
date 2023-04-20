import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import broker from './broker'

const ButtonStatus = ()=>{
  const [cnt, setCnt] = useState()

  useEffect(() => {
    // subscribe to a channel, will return an unsubscriber
    // so when unmounted you can unsub
    const unsub = broker.subscribe("countUpdated", (count)=>{
      setCnt(count)
    })

    return () => {
      unsub()
    }
  }, []);


  return <div>{cnt}</div>

}

const CounterButton = () => {
  const [cnt, setCounter] = useState(1)
  return (<button onClick={()=>{
                  setCounter(cnt+1);
                  broker.publish("countUpdated", cnt)
      }} >Click me</button>)

}


function App() {

  return (
    <div className="App">
      <h1>hello</h1>
      <div className="card">
        <CounterButton />
      </div>

      <div >
      <ButtonStatus />
      </div>


    </div>
  )
}

export default App
