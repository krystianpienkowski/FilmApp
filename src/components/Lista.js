import React from "react";

const Lista = (props) => {
    if (!props.movies || props.movies.length === 0) {
        return null; 
    }


    const FavouriteComponent = props.favouriteComponent;

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className="image-container col-sm-6 col-md-4 col-lg-2 movie-poster">
                    <img src={movie.Poster} alt={movie.Title}></img>
                    <div 
                        onClick={()=> props.handleFavouritesClick(movie)} 
                        className="overlay d-flex align-items-center justify-content-center">
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
}

export default Lista;
