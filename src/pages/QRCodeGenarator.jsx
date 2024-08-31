import { useCallback, useRef, useState } from "react"
import styled from "styled-components"
import QRCode from "qrcode.react"
import Button from "../components/Button"

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  padding: 40px;
  background: #fff; 
  border-radius: 15px; 
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); 
  max-width: 400px; 
  margin: 50px auto; 
  gap: 1.25rem;
`


const Title = styled.h2`
  color: #333; 
  font-size: 24px; 
  margin: 0;
  text-align: center;
`


const Input = styled.input`
  padding: 12px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  width: 100%; 
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); 
  font-size: 16px; 
  transition: border-color 0.3s; 

  &:focus {
    border-color: #007bff; 
    outline: none;
  }
`

const QRCodeContainer = styled.div`
  padding: 20px; 
  background: #f9f9f9; 
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
`

const QRCodeGenerator = () => {
  const [text, setText] = useState("")
  const svgRef = useRef()

  function downloadBlob(blob, filename) {
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = objectUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000)
  }

  const downloadSVG = useCallback(() => {
    console.log(svgRef.current)
    console.log(svgRef.current.children[0])
    console.log(svgRef.current.children[0].innerHTML)
    const content = svgRef.current.children[0].innerHTML
    const contentWithSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="128" width="128" viewBox="0 0 29 29">${content}</svg>`
    const blob = new Blob([contentWithSvg], { type: "image/svg+xml" })
    downloadBlob(blob, `qrcode-${text}.svg`)
  }, [])

  return (
    <Container>
      <Title>QR Code Generator</Title>
      <Input type="text" value={text}  onChange={(e) => setText(e.target.value)}  placeholder="Enter text to encode" maxLength={1000}/>
      {text && (
        <QRCodeContainer ref={svgRef}>
          <QRCode value={text} size={256} renderAs={"svg"} />
        </QRCodeContainer>
      )}
      <Button onClick={downloadSVG}>Download</Button>
    </Container>
  )
}

export default QRCodeGenerator
