import React from "react";
import { useEffect, useState } from "react";
import Cards from "../Card/Cards";
const MovieList = () => {
  const [movielist, setMovielist] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          " https://api.tvmaze.com/search/shows?q=all"
        );
        if (!response.ok) {
          console.error("network is not working");
        }
        const data = await response.json();
        setMovielist(data);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();
  }, []);
  return (
    <div className=" p-[3rem] pt-0">
      {movielist && (
        <div className="flex flex-wrap justify-center">
          {movielist.map((item) => (
            <Cards item={item} key={item.show.id}></Cards>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
