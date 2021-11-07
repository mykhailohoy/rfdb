import React from 'react'
// import API from "../API";

// config
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config';

// hooks
import { useHomeFetch } from '../hooks/useHomeFetch';

// image
import NoImage from "../images/no_image.jpg";

// components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from "./SearchBar";
import Button from './Button';

const Home = () => {

  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();

  console.log(state);

  if (error) return <div>Something went really, really wrong.</div>
  return (
    <>
      {!searchTerm && state.results[0] ?
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
        : null}
      <SearchBar setSearchTerm={setSearchTerm} results={state.results} />
      <Grid header={searchTerm ? "Search Results" : "Popular Films"}>
        {state.results.map(movie => (
          <Thumb
            key={movie.id}
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            movieId={movie.id}
            clickable
          />
          // <div key={movie.id}>{movie.original_title}</div>
        ))}
      </Grid>
      {loading && <Spinner />}
      {!loading && state.page < state.total_pages &&
        <Button text="Load more" callback={() => setIsLoadingMore(true)} />
      }
    </>
  )

}

export default Home;