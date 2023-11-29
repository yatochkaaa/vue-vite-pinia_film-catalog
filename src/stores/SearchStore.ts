import { Movie } from "@/types";
import { defineStore } from "pinia";
import { useMovieStore } from "@/stores/MovieStore";

const url = "https://api.themoviedb.org/3/search/movie"
const apiKey = "a65bb1b6afe82a775b122aa8b665d0a6"

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    movies: [] as Movie[],
    isLoading: false,
  }),
  actions: {
    async getMovies(movieTitle: string) {
      this.isLoading = true;
      try {
        const res = await fetch(`${url}?api_key=${apiKey}&query=${movieTitle}`)
        const data = await res.json()
        this.movies = data.results
        console.log(data.results)
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.isLoading = false
      }
    },
    addFavoriteMovie(movie: Movie) {
      const movieStore = useMovieStore();
      const isMovieAdded = movieStore.movies.some(movieFromStore => movieFromStore.id === movie.id)
      if (!isMovieAdded) {
        movieStore.movies.push({ ...movie, isWatched: false });
        movieStore.activeTab = 1;
      }
    },
  },
})
