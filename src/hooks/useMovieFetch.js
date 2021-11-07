import { useState, useEffect } from "react";
import API from "../API";
import { getSessionState } from "../helpers";

export const useMovieFetch = movieId => {

  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const movie = await API.fetchMovie(movieId);
        const credits = await API.fetchCredits(movieId);
        const directors = credits.crew.filter(
          member => member.job === "Director"
        )

        setState({
          ...movie,
          actors: credits.cast,
          directors
        })

        setLoading(false)
      } catch (error) {
        setError(true)
      }
    }

    const sessionState = getSessionState(movieId);
    if (sessionState) {
      setState(sessionState);
      setLoading(false);
    }

    fetchMovie();
  }, [movieId])

  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state))
  }, [state, movieId])

  return { state, loading, error }
}