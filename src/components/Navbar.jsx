import { useState } from "react"
import {FaArrowLeft, FaBars,FaGlobeAmericas,FaHome,FaNetworkWired,FaQrcode,FaRegQuestionCircle,FaSearch,FaTasks,FaUser,} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import AuthStore from "../stores/auth"
import Button from "./Button"
import { toastSuccess } from "../utils/toast"

// barra de navegação.
const NavBar = styled.div`
  width: 240px;
  background-color: #2c3e50;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 3px 0 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  }
`

// links barra de navegação.
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #34495e;
    color: #ecf0f1;
  }
`

//  botão da barra de navegação.
const NavBarToggle = styled.div`
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
`

const UserDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const Navbar = () => {
  const { logout, user } = AuthStore()

  const [isNavBarOpen, setIsNavBarOpen] = useState(false)
  // Alterna a visibilidade da barra de navegação.
  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen)
  }
  const navigate = useNavigate()

  // Função para simular logout
  const handleLogout = () => {
    logout()
    navigate("/")
    toastSuccess({ text: "Logout realizado com sucesso!" })
  }

  return (
    <>
      <NavBarToggle onClick={toggleNavBar}>
        <FaBars size={24} color={isNavBarOpen ? "#ecf0f1" : "#2C3E50"} />
      </NavBarToggle>
      <NavBar $isOpen={!!isNavBarOpen}>
        <UserDiv>
          <FaUser />
          <h2>{user}</h2>
        </UserDiv>
        <StyledLink to="/app">
          <FaHome />
          Home
        </StyledLink>
        <StyledLink to="/app/QRCodeGenerator">
          <FaQrcode />
          QR Code Generator
        </StyledLink>
        <StyledLink to="/app/ipFinder">
          <FaNetworkWired />
          IP Address Finder
        </StyledLink>
        <StyledLink to="/app/movieSearchEngine">
          <FaSearch />
          Movie Search
        </StyledLink>
        <StyledLink to="/app/todoApp">
          <FaTasks />
          Todo App
        </StyledLink>
        <StyledLink to="/app/quizApp">
          <FaRegQuestionCircle />
          Quiz App
        </StyledLink>
        <StyledLink to="/app/translator">
          <FaGlobeAmericas />
          Translator
        </StyledLink>
        <Button onClick={handleLogout}>
          <FaArrowLeft width={24} height={24} />
          Logout
        </Button>
      </NavBar>
    </>
  )
}

export default Navbar
