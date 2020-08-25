export const searchMovies = title => {

    const apiURL = `${process.env.REACT_APP_TMDB_URL}/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${title}&language=es`
    
    return fetch(apiURL)
           .then(res => res.json())
           .then(response => {
                const { results } = response
                const apiMovies = results.map(movie => {
                    //if(movie.id) return movie.id
                    return movie.id
                })                 
                
                return apiMovies          
            })
}
 
export const getCredits = movieIds => {
    const apiMovies = movieIds.map(id => {

        const apiURL = `${process.env.REACT_APP_TMDB_URL}/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=es&append_to_response=credits`
        return fetch(apiURL)
                .then(res => res.json())
                .then(movie => {                    
                    const movieData = {}
                    movieData.id = id
                    movieData.title = movie.title
                    movieData.year = new Date(movie.release_date).getFullYear()
                    movieData.plot = movie.overview
                    movieData.image = `${process.env.REACT_APP_TMDB_IMG_URL}/${movie.poster_path}`
                    movieData.opinion = movie.opinion

                    const crewArray = movie.credits ? movie.credits.crew : []
                    crewArray.forEach(crew => {
                        if(crew.job === 'Director') movieData.director = crew.name
                    })

                    // Seleccionamos sólo los 5 primeros actores
                    const castArray = movie.credits ? movie.credits.cast : []
                    movieData.cast = ''
                    castArray.slice(0, 5).forEach(cast =>{
                        movieData.cast = movieData.cast + (movieData.cast === '' ? cast.name : ',' + cast.name)
                    })

                    return movieData
                })
    })

    return Promise.all(apiMovies)    
    
}