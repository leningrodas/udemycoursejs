"use strict"

const url = "https://api.themoviedb.org/3/search/movie?api_key="
const imageUrl ="https://image.tmdb.org/t/p/w500/"
const nowMovie = "https://api.themoviedb.org/3/movie/now_playing?api_key="
const movieGenre = "https://api.themoviedb.org/3/genre/movie/list?api_key="



// window.onload = function (){
//     $("#loadedGif").css('display', 'none')
// }

let popularMovies;
function getPopMovies(string){
    return fetch(`${nowMovie}${versionThree}&language=en-US&page=1&include_adult=false`,
        {headers: {'Authorization' : 'token' + versionThree}})
        .then(res => res.json())
        .catch(console.error);
}
getPopMovies().then(movies => {
    popularMovies = movies.results
    renderSearchedMovies(popularMovies);
})

