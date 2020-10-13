import React from 'react'
import './styles/global.css'
interface TitleProps {
  text: string
}

function Title(props: TitleProps) {
  return <h1>{props.text}</h1>
}

function App(): JSX.Element {
  return (
    <div className="App">
      <Title text="Hello World" />
    </div>
  )
}

export default App
