import React, { useEffect, useState } from "react";
// import "./home.css";
import Navbar from "../../components/nav/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import MovieList from "../../components/MovieList/MovieList";
const Home = ({ movielist }) => {
  console.log(movielist);
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }
  return (
    <>
      <Navbar />
      <div className="poster">
        {movielist && (
          <div className=" w-full  h-[90vh] ">
            <img
              src={movielist[0]?.show.image?.original}
              className="top-0 left-0 w-full h-full object-contain "
              alt="movieposter1"
            />
            <div className="bg-black/30 absolute top-0 left-0 w-full h-screen">
              <div className="absolute top-0 w-full h-full flex flex-col justify-end">
                <div className="mb-[5rem] ml-[2rem]">
                  <h1 className=" font-[900] text-[4rem] mb-0">
                    {movielist[0]?.show.name}
                  </h1>
                  <div className=" text-[2rem] mb-[1rem]  ">
                    {movielist[1]?.show.premiered}
                    <span className="ml-[3rem]">
                      {movielist[0]?.show.rating?.average}
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                  </div>
                  <div className="italic text-[1rem] mb-[0.25rem] flex  text-left w-[50%]">
                    {removeTags(movielist[1]?.show.summary)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <MovieList />
      </div>
    </>
  );
};
export default Home;
