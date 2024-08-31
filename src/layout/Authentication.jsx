import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import styled from "styled-components"
import Footer from "../components/Footer"
import AuthStore from "../stores/auth"
import { toastError } from "../utils/toast"
import { useEffect } from "react"
import { createLocalJWKSet, decodeJwt, jwtVerify } from "jose"

// conteúdo principal
const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`

const Authentication = () => {
  const { isAuthenticated, logout, login } = AuthStore()
  const navigate = useNavigate()

  //Verifica se a pessoa está logada 
  useEffect(() => {
    checkToken()
  }, [])

  async function checkToken() {
    try {
      const token = localStorage.getItem("token")
      const secret = new TextEncoder().encode(
        import.meta.env.VITE_API_JSONSECRET
      )

      if (token) {
        const { payload } = await jwtVerify(token, secret, {
          issuer: import.meta.env.VITE_API_ISSUER,
          audience: import.meta.env.VITE_API_AUDIENCE,
        })
        login(payload.user)
        return
      }
    } catch (error) {
      console.log(error)
      logout()
    }
    if (!isAuthenticated) {
      toastError({
        text: "Faça o login para acessar esta rota.",
      })
      navigate("/")
    }
  }

  if (!isAuthenticated) {
    return <></>
  }

  return (
    <>
      <Navbar />
      <MainContent>
        <Outlet />
        <Footer />
      </MainContent>
    </>
  )
}

export default Authentication
