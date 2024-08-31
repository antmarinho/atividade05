import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import "./App.css"

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
`

const App = () => {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
  )
}

export default App
