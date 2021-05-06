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

function renderSearchedMovies (input){
    let html = ``;
    let test = 0;
    let htmlrating = ``;

    for(let movie of input){
        let movieRating = movie.vote_average / 2;
        if(movieRating <= .5) {
            htmlrating = `<i class="fas fa-star-half"></i>`
        }else if(movieRating <= 1) {
            htmlrating = `<i class="fas fa-star"></i>`
        } else if(movieRating <= 1.5) {
            htmlrating = `<i class="fas fa-star"></i><i class="fas fa-star-half"></i>`
        }else if(movieRating <= 2) {
            htmlrating = `<i class="fas fa-star"></i><i class="fas fa-star"></i>`
        }else if(movieRating <= 2.5) {
            htmlrating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half"></i>`
        }else if(movieRating <= 3) {
            htmlrating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`
        }else if(movieRating <= 3.5) {
            htmlrating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half"></i>`
        }else if(movieRating <= 4) {
            htmlrating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`
        }else if(movieRating <= 4.5) {
            htmlrating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half"></i>`
        }else if(movieRating <= 5) {
            htmlrating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`
        }

        html += `<div class='card col-4 flip-box card${test}' id="testing">
                 <form>
                 <img class ="w-100" src="${imageUrl}${movie.poster_path}" + alt="Not Found" onerror=this.src="img/error.jpg">
                 <h5 class='card_header'><strong>${movie.title}</strong></h5>
                 <h6 class='card_header'><strong>Overview</strong></h6>
                 <p contenteditable="false" class="paragraph" id="overviewParagraph${test}"> ${movie.overview}</p>
                  <p contenteditable="false" class="paragraph"> <strong>Rating: </strong>${htmlrating}</p>
                  
                  <p contenteditable="false" class="paragraph"> <strong>Release Date:</strong> ${movie.release_date}</p>
                 <button  class="editMovieButton added-style-button">Edit Movie</button>
                 <button class="deleteMovieButton added-style-button">Delete Movie</button>
                 </form> 
                 </div>`
        test +=1;
    }
    document.getElementById('movies').innerHTML = html;
    $( "#loading" ).css('display', 'none')
    // $( "#carouselExampleIndicators").css('display', 'block')
    $( "#movies" ).css('display', 'flex')
    $( ".navbar" ).css('display', 'block')

//************************************************************
//************************ EDIT BUTTON PRESSED****************
//************************************************************



    $('.editMovieButton').click(function (e){
        e.preventDefault();
        $('.paragraph').attr('contenteditable', function (i, a){
            return a === 'true' ? "false":"true";
        })
    });



    $('.deleteMovieButton').click( function (e){
        e.preventDefault();
        $(this).parent().parent().css('display', 'none')
    });

//************************************************************
//******************EDIT BUTTON PRESSED***********************
//************************************************************

    getMovieGenres(input);
}











function addMovieoption(){
   let title = $("#newMovieTitle").val();
   let overview = $("#newMovieOverview").val();
   let genres = $("#movieGenre").val();
   let poster = $("#moviePoster").val();
   let html =``
    html += `<div class='card col-4' id="testing">
            <form>
            <img class="w-100" src="${poster}" + alt="not found" onerror=this.src="IMG/error.jpeg" >
            <h5 class="card_header">${title}</h5>
            <p contenteditable="false" class="editableContent" id="overviewPara">${overview}</p>
            <p class="editableContent">${genres}</p>
            <buttton class="editnewMovieBtn">edit movie</buttton>
            <button class="deleteMovieBtn">delete movie</button>
            </form>
            </div>`

    document.getElementById('movieCards').innerHTML += html

    $('.editnewMovieBtn').click(function (e){
        e.preventDefault();
        $('.editableContent').attr('contenteditable', function (i, a){
            return a === 'true' ? "false": "true";
        })
    });

   $('.deleteMovieBtn').click( function (e){
       e.preventDefault();
       $(this).parent().parent().css('display', 'none')
   });
}