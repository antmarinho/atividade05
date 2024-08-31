import axios from "axios"

export default async function getMovies({ pageParam = 1, search }) {
  const token = import.meta.env.VITE_API_TOKEN
  if (search === "")
    return {
      status: 400,
      message: "Digite algo para buscar",
      movies: [],
    }
  const url = `https://api.themoviedb.org/3/search/movie?api_key=c85d9b3478897bf2c277b66edaf72119&include_adult=false&language=pt-BR&page=${pageParam}&query=${search}`

  const response = await axios(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer Authorization: Bearer ${token}`,
    },
  })
  if (response.status >= 200 && response.status < 300) {
    const movies = await response.data
    return {
      status: response.status,
      message: "Filmes encontrados com sucesso",
      movies: movies,
    }
  } else {
    return {
      status: response.status,
      message: "Ocorreu um erro ao tentar realizar a busca",
    }
  }
}
