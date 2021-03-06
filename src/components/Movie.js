import React from 'react'
import { useParams } from 'react-router-dom';

import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import { useMovieFetch } from '../hooks/useMovieFetch';

// components
import Grid from "./Grid";
import Spinner from "./Spinner";
import BreadCrumb from './BreadCrumb';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';

// images
import NoImage from "../images/no_image.jpg";

const Movie = () => {
  const { movieId } = useParams();
  const { state: movie, loading, error } = useMovieFetch(movieId);
  // console.log(movie);
  if (loading) return <Spinner />
  if (error) return <div>Oops, something went scheiße</div>
  return (
    <>
      <BreadCrumb movieTitle={movie.title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
      <Grid header="Actors">
        {movie.actors.map(actor => (
          <Actor 
            name={actor.name}
            character={actor.character}
            imageUrl = {
              actor.profile_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
              : NoImage
            }
          />
        ))}
      </Grid>
    </>
  )
}

export default Movie;