import { Link } from "react-router-dom"
import styled from "styled-components"

const PageNotFoundContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledLink = styled(Link)`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
  }
`

const Title = styled.h1`
  font-size: 2rem;
`

const PageNotFound = () => {
  return (
    <PageNotFoundContainer>
      <Title>Página não encontrada</Title>
      <StyledLink to="/app">Ir para o início</StyledLink>
    </PageNotFoundContainer>
  )
}

export default PageNotFound
