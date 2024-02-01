import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const Card = ({ item, key }) => {
  console.log(item);
  return (
    <div key={key}>
      {item.show.image && (
        <div key={item.id}>
          <Link to={`/details/${item.show.id}`}>
            <div className="tv-card hover:bg-white/80">
              <img
                src={item.show.image.medium}
                alt={`${item.show.name} TV Show Image`}
              />
              <div className="tv-card-content">
                <div className="tv-card-title font-[900] flex justify-between ">
                  {item.show.name}
                  {item.show.rating.average && (
                    <div>
                      Rating: {item.show.rating.average}
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: "#FFD43B" }}
                      />
                      {/* <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#fcff61" }}
                    /> */}
                    </div>
                  )}
                </div>

                <div className="tv-card-info">
                  <div>Genres: {item.show.genres.join(", ")}</div>
                </div>
                <div className="tv-card-info">
                  <div>Language: {item.show.language}</div>
                </div>
                <div className="tv-card-info">
                  <div>Premiered: {item.show.premiered}</div>
                </div>
                <div className="tv-card-info">
                  <div>Runtime: {item.show.runtime} minutes</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Card;
