import { defineStore } from "pinia";
import { Movie } from '@/types';

interface MovieStoreState {
  movies: Movie[];
  activeTab: number;
}

export const useMovieStore = defineStore("movieStore", {
  state: (): MovieStoreState => ({
    movies: [],
    activeTab: 2,
  }),
  getters: {
    watchedMovies(): Movie[] {
      return this.movies.filter((movie) => movie.isWatched)
    },
    totalCountMovies(): number {
      return this.movies.length;
    },
    getMoviesFromLocalStorage() {
      const moviesFromLocalStorage = localStorage.getItem("movies")
      if (moviesFromLocalStorage) {
        this.movies = JSON.parse(moviesFromLocalStorage)
      }
    },
  },
  actions: {
    setActiveTab(id: number) {
      this.activeTab = id
    },
    toggleWatched(id: number) {
      const movie = this.movies.find(movie => movie.id === id);
      if (movie) {
        movie.isWatched = !movie.isWatched
      }
    },
    deleteMovie(id: number) {
      this.movies = this.movies.filter(movie => movie.id !== id);
    },
  },
});
