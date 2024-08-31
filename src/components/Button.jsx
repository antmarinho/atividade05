import styled from "styled-components"

const ButtonElement = styled.button`
  margin-top: "20px";
  color: "white";
  background-color: "transparent";
  border: "none";
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  gap: 0.5rem;
`

const Button = ({ ...rest }) => {
  return <ButtonElement {...rest} />
}

export default Button
