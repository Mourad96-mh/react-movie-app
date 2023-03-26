import React, {Fragment, useState, useEffect, useCallback} from 'react';
import Button from './Components/UI/Button';
import MoviesList from './Components/MoviesList';
import AddMovie from './Components/AddMovie';

import './App.css';





function App() {


  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async ()=> {
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch('https://react-movies-f9d59-default-rtdb.firebaseio.com/movies.json');

      if(!response.ok){
          throw new Error('Something went wrong');
      }

      const data = await response.json();

      // so herre we get an object not an array
      // think how to go through an object using for loop
      const loadedData = [];

      for(let key in data){
        loadedData.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releasedAt: data[key].releasedAt
        });

      }

      setMovies(loadedData)
    }catch(e){
      setError(e.message);
    }
    setIsLoading(false);
  }, [])

  useEffect(() =>{
    fetchMoviesHandler()
  }, [fetchMoviesHandler])



  let content = <p>Found No Movies</p>

  if(error){
    content = <p>{error}</p>
  }

  if(isLoading){
    content = <p>Loading...</p>
  }

  if(movies.length > 0){
    content = <MoviesList movies={movies}/>
  }


  const addMovieHandler = async (movie) => {
    // console.log(movie);
    const response = await fetch('https://react-movies-f9d59-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    console.log(data);
  }


  return (
    <Fragment>
      <AddMovie onAddMovie={addMovieHandler}/>
      <section>
        <Button onClick={fetchMoviesHandler}>Fetch Movies</Button>
      </section>
      <section>
        {content}
      </section>
    </Fragment>
  );
}

export default App;
