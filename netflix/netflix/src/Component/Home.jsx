import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai"


const apiKey = "1626eee3b125ea301c41e9f29b5c68ee";
const url = "https://api.themoviedb.org/3/movie/";
const imgUrl = "https://image.tmdb.org/t/p/original";
const genreUrl =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=1626eee3b125ea301c41e9f29b5c68ee";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";
const Card = ({ img }) => (
  <img className="className" src={img} alt="cover" />
  // <div className="className">
  //   hh
  // </div>
);

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlay, setNowPlay] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
      console.log(upcomingMovies);
    };

    const fetchNowPlaing = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}${nowPlaying}?api_key=${apiKey}`);
      setNowPlay(results);
      console.log(nowPlay);
    };

    const fetchPopularMovies = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
      console.log(popularMovies);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
      console.log(topRatedMovies);
    };

    // const fetchGenre = async()=>{
    //   const {data : {genres},} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
    //   setGenre(genres);
    //   console.log(genres)
    // }
    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${genreUrl}`);
      setGenre(genres);
      console.log(genres);
    };

    getAllGenre();
    // fetchGenre();
    fetchTopRated();
    fetchPopularMovies();
    fetchNowPlaing();
    fetchUpcoming();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "none",
        }}
      >
        {popularMovies[0] && <h2>{popularMovies[0].original_title}</h2>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
<div>
<button><BiPlay />Play</button>
        <button>My List <AiOutlinePlus /></button>

</div>
      </div>
      <Row title={"Upcoming On Netflix"} arr={upcomingMovies} />
      <Row title={"Popular Tv Shows"} arr={popularMovies} />
      <Row title={"Now Playing"} arr={nowPlay} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
