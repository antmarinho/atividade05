import { useState } from "react" 
import styled from "styled-components" 
import getMovies from "../services/movies"
import { toastError, toastSuccess } from "../utils/toast"
import { dateConveror } from "../utils/dateConversor"
import imageNotFound from "../assets/image.png"


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 50px auto;
`

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`

const Input = styled.input`
  margin-bottom: 20px;
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


const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`


const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  max-height: 500px; 
  overflow-y: auto; 
  width: 100%;
`


const MovieCard = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  width: 180px; 
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  img {
    border-radius: 10px;
    max-width: 100%; 
    height: auto;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`


const MovieSearchEngine = () => {
  const [query, setQuery] = useState("") 
  const [movies, setMovies] = useState(null) 


  const searchMovies = async () => {
    try {
      const searchQuery = query.trim()
      const response = await getMovies({ search: searchQuery }) 
      if (response.status >= 200 && response.status < 300) {
        setMovies(response.movies.results) 
        toastSuccess({ text: response.message })
      } else {
        toastError({ text: response.message })
      }
    } catch (error) {
      toastError({ text: error?.message })
      console.error("Error fetching movie data:", error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    searchMovies()
  }

  return (
    <Container>
      <Title>Movie Search Engine</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" value={query}  onChange={(e) => setQuery(e.target.value)} placeholder="Search for a movie" />
        <Button>Search</Button>{" "}
      </Form>
      <MoviesContainer>
        {movies &&
          (movies?.length > 0 ? (
            movies?.map(
              (
                movie 
              ) => (
                <MovieCard key={movie.imdbID}>
                  <img src={ movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : imageNotFound} alt={`${movie.Title} Poster`}/>
                  <h3>{movie.title}</h3> 
                  <p>{dateConveror(movie.release_date)}</p>
                </MovieCard>
              )
            )
          ) : (
            <h2>Não foi possível encontrar nenhum filme.</h2>
          ))}
      </MoviesContainer>
    </Container>
  )
}

export default MovieSearchEngine 
