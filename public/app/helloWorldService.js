"use strict";

angular
.module("HelloWorldApp")
.service("helloWorldService", function($http, $q){
    const service = this;

// Get Countries
    service.getCountry = (country)=>{
        return $http({ 
            url:`https://restcountries-v1.p.rapidapi.com/name/${country}`,
            headers : {
              "X-RapidAPI-Host": RestCountriesApiInfo.host,
              "X-RapidAPI-Key": RestCountriesApiInfo.key
            },
            method: "GET"
        })
        .then((response)=>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.error(error);
        })
    };
        

// Get Translation
service.getTranslation = ()=>{
    const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');

    const languageTranslator = new LanguageTranslatorV3({
      version: '2019-04-02',
      iam_apikey: watsonTranslatorCredentials.apikey,
      url: watsonTranslatorCredentials.url,
    });
    
    let translateParams = {
      text: 'Hello',
      model_id: 'en-es',
    };
    
    languageTranslator.translate(translateParams)
      .then(translationResult => {
        console.log(JSON.stringify(translationResult, null, 2));
      })
      .catch(err => {
        console.log('error:', err);
      });
}


    // service.getTranslation = ()=>{
    //     return $http({
    //         url: watsonTranslatorCredentials.url+"/v3/translate?version=2018-05-01",
    //         headers : {
    //             "Content-Type": "application/json"
    //         },
    //         method: "POST",
    //         data: {
    //             "text": "hello world! how are you?",
    //             "model_id": "en-es"
    //         },
    //         Authorization: {
    //             username: "apikey",
    //             password: watsonTranslatorCredentials.apikey
    //         }
    //         // apikey: watsonTranslatorCredentials.apikey
    //         // Authorization: `apikey ${watsonTranslatorCredentials.apikey}`
    //         // dataType: 'json',
    //         // contentType: "application/json"
    //     })
    //     .then((response)=>{
    //         console.log(response);
    //         return response;
    //     })
    //     .catch((error)=>{
    //         console.error(error);
    //     })    
    // };
        // Watson cURL
        // curl -X POST -u "apikey:{apikey}"
        // --header  
        // --data "{\"text\": [\"Hello, world! \", \"How are you?\"],
        //  \"model_id\":\"en-es\"}" 
        // "{url}/v3/translate?version=2018-05-01"

    // Rapid QL?
    // rql.query(`{
    //     Http.post(
    //       url:"https://IBMWatsonLanguageTranslatordimasV1.p.rapidapi.com/translate",
    //       headers : {
    //         "X-RapidAPI-Host": "IBMWatsonLanguageTranslatordimasV1.p.rapidapi.com",
    //         "X-RapidAPI-Key": "688332cce4msh2a5ce805cd4fa7dp1cd5d1jsn7fe3c45b4f33",
    //         "Content-Type": "application/x-www-form-urlencoded"
    //       },
    //       form : {
    //         "text": "Greetings person, how are you?",
    //         "source": "en",
    //         "target": "af"
    //       }
    //     ) {
      
    //     }
    //   }`)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

});

/**
 * Examples from prior projects:
 * 
 * 
    // GET
    service.getCharacters = (currentUrl)=>{
        return $http({
            url: `${currentUrl}`, // hero or villains
            method: "GET"
        })
        .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            console.error(err);
        })
    };

    // POST
    service.createVillain = (newVillain)=>{
        console.warn(newVillain);
        return $http({
            url: "/villains",
            method: "POST",
            data: newVillain
            })
        .then((response)=>{
            return response.data;
        });
    };

    // PUT
    service.updateVillainName = (villainUpdate)=>{
        console.warn(villainUpdate.character_name, villainUpdate.newName)
        return $http({ //image
            url: "/villainsName",
            data: villainUpdate,
            method: "PUT"
        })
        .then((response)=>{
            console.log(`villain name updated from ${villainUpdate.character_name} to ${villainUpdate.newName}`);
            return response;
        })
        .catch((error)=>{
            console.error(error);
        });
    };

    service.updateVillainImage = (villainUpdate)=>{
        return $http({
            url: "/villainsImage",
            data: villainUpdate,
            method: "PUT"
        })
        .then((response)=>{
            console.log(`villain image updated`);
            return(response);
        })
        .catch((error)=>{
            console.error(error);
        });
    };


    // DELETE
    service.deleteVillain = (villain)=>{
        console.log(`say goodbye to ${villain}`);

        return $http({
            url: "/villains/"+villain,
            method: "DELETE"
        })
        .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            console.error(err);
        })
    };

        service.callTheMovieDbApi = () => {
        return $q(function(resolve, reject){
            console.log("all the params in callTheMovieDbApi:");
            console.log(service.api_key, service.pageNumber, service.vote_averageGreaterThanOrEqual, service.earliestReleaseDate, service.latestReleaseDate, 
                service.genreSelection, service.genresNotWanted, service.runTimeLessThanOrEqual);
            $http.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
                api_key: service.api_key,
                language: "en-US",
                sort_by: "popularity.desc",
                include_adult: false,
                include_video: false,
                page: service.pageNumber,
                'release_date.gte': service.earliestReleaseDate,
                'release_date.lte': service.latestReleaseDate,
                // 'with_genres': service.genreSelection,  // perhaps having both params breaks it?  i'm not sure why..
                'without_genres': service.genresNotWanted,
                'with_runtime.gte': service.runTimeGreaterThanOrEqual,
                'with_runtime.lte': service.runTimeLessThanOrEqual,
                'vote_average.gte': service.vote_averageGreaterThanOrEqual,
                'vote_average.lte': service.vote_averageLessThanOrEqual
            }
        })
            .then( (response)=>{
                response.data.results.forEach((movie)=>{ // this is to add starred boolean for watchlist usage
                    movie.starred = false;
                });
                service.responseData = response.data; // saves data to service
                resolve(response.data);  // the return of a promise
            })
        })
    };

service.getMovies = () => {
    return $q(function(resolve, reject) {

    service.callTheMovieDbApi()
      .then ( (response) => {
        console.log("response of callTheMovieDbApi:");
        console.log(response);
        let movies=[];

        service.pageLimitFunction() // uses service.responseData to write page limit        
          let children = response.results; //Adjust for proper API return
            children.forEach( function(child, index) {
                let isWatchlisted = ( service.isWatchlisted(child.id) !== false );
                let movieObj = {
                title: child.title,
                poster: `https://image.tmdb.org/t/p/w185/` + child.poster_path, //Change thumbnail to appropraite return from API
                description: child.overview,  // Change permalink to appropraite return from API 
                backdrop: `https://image.tmdb.org/t/p/original/` + child.backdrop_path,
                avgVote: child.vote_average,
                releaseDate: child.release_date,
                genres: child.genre_ids, // array of genre id #s
                id: child.id,
                starred: isWatchlisted // if movie ID is in the watchlistArray, it returns a number, a number !== false, so this is "true", if it returns false, false!==false is "false".
              }
              movies.push(movieObj);
              if ( index === (children.length - 1) ){
                  service.movieList = movies;
                resolve();
              }
            })
        });
    });
  }


service.searchTheMovieDbApi = () => {
    return $q(function(resolve, reject){
        console.log("searchQuery:");
        console.log(service.searchQuery);
        $http.get('https://api.themoviedb.org/3/search/movie', {
        params: {
            api_key: service.api_key,
            language: "en-US",
            include_adult: false,
            page: service.queryPageNumber,
            query: service.searchQuery
        }
    })
        .then( (response)=>{
            response.data.results.forEach((movie)=>{ // this is to add starred boolean for watchlist usage
                movie.starred = false;
            });
            service.responseData = response.data; // saves data to service
            resolve(response.data);  // the return of a promise
        })
    }
)
};

 */