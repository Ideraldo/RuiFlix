import movieTrailer from 'movie-trailer';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { getMovies } from '../api';
import "./Row.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const imageHost = "https://image.tmdb.org/t/p/original/"

function Row({title, path, isLarge}) {
  const [scrollX, setScrollX] = useState(0);

  const [movies, setMovies] = React.useState([]);
  const [trailerUrl, setTrailerUrl] = React.useState("")

  const handleOnClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.name || movie.title || movie.original_name || "")
        .then((url) => {
          setTrailerUrl(url);
        })
        .catch((error) => {
          console.log("Error fetching movie trailer: ", error);
        });
    }
  };
  
  const fetchMovies = async (_path) => {
    try{
        const data = await getMovies(_path);
        setMovies(data?.results);
    }catch (error){console.log("Error fetching movies", error)}
  };

  useEffect(() => {
    fetchMovies(path)
  }, [path])
  
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x > 0){
      x = 0;
    } 
    setScrollX(x);
  }

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listWidth = movies.length * 130;
    if((window.innerWidth - listWidth > x)){
      x = (window.innerWidth - listWidth) - 60;
    } 
    setScrollX(x);
  }

  return (
  <div className='row-container'>
    <h2 className='row-header'>{title}</h2>
    <div className='row-cards' style={{
      marginLeft: scrollX}}>{movies?.map(movie => {
      return <img 
        className={`movie-card ${isLarge && "movie-card-large"}`}
        onClick={() => handleOnClick(movie)}
        key={movie.id}
        src={`${imageHost}${isLarge ? movie.backdrop_path : movie.poster_path}`}
        
        alt={movie.name}></img>
    })}
  
    <div className='row-left' onClick={handleLeftArrow}>
      <NavigateBeforeIcon style={{fontSize: 50}}></NavigateBeforeIcon>
    </div>
    <div className='row-right' onClick={handleRightArrow}>
      <NavigateNextIcon style={{fontSize: 50}}></NavigateNextIcon>
    </div>
  </div>
    {trailerUrl && <ReactPlayer url={trailerUrl} playing={true} controls={true} ></ReactPlayer>}
  </div>
  )
}

export default Row