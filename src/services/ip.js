import axios from "axios"
import { toastError, toastSuccess } from "../utils/toast"

export async function getIp(ip, callback) {
  try {
    const url = `https://ipinfo.io/${ip}/json`
    const response = await axios.get(url) // Faz uma requisição GET para a API ipinfo.io
    callback(response.data) // Armazena os dados da resposta no estado ipData

    toastSuccess({ text: "Ip encontrado com sucesso!" })
  } catch (error) {
    console.error("Error fetching IP address data:", error) // Exibe um erro no console em caso de falha
    toastError({ text: `Não foi possível encontrar o ip: ${ip}` })
  }
}
