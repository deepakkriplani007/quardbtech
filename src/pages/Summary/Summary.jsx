import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./summary.css";
const Summary = ({ movielist }) => {
  const { showId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [showdetail, setShowdetail] = useState(null);
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    seats: "",
    email: "",
  });
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
    togglePopup();
    alert("Successfully Booked!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({
      ...bookingInfo,
      [name]: value,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        const data = await response.json();

        const matchingShow = data.find(
          (item) => item.show.id.toString() === showId
        );

        setShowdetail(matchingShow);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    showdetail && (
      <>
        <div>
          <div className="flex flex-row p-[40px] justify-evenly" key={showId}>
            <div className="w-[50vh] h-[50vh] ">
              <img
                className="h-[50vh] rounded-md  "
                src={showdetail?.show.image.original}
                alt={showdetail?.show.name}
              />
            </div>

            <div className="p-[20px] w-[50%]">
              <h1 className="font-[900] mb-[20px] text-[2rem] mb-0">
                {showdetail?.show.name}
              </h1>
              <div className="mb-[20px]">
                <p>Type: {showdetail?.show.type}</p>
                <p>Genres: {showdetail?.show.genres.join(", ")}</p>
                <p>
                  Schedule: {showdetail?.show.schedule.time} on{" "}
                  {showdetail?.show.schedule.days.join(", ")}
                </p>
              </div>

              <button className="book-now-button" onClick={togglePopup}>
                Book Now
              </button>
            </div>
          </div>
          {/* <div
        className="show-summary"
        dangerouslySetInnerHTML={{ __html: showdetail?.show.summary }}
      /> */}
        </div>
        <div className="bg-white text-black p-[20px]">
          <h2 className="text-[25px] font-[700] pb-[10px] ">About the show </h2>
          <p className="italic text-[16px]">
            {removeTags(showdetail?.show.summary)}
          </p>
        </div>
        {showPopup && (
          // className=""
          <div className="popup">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={bookingInfo.name}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="seats"
                placeholder="Number of Seats"
                value={bookingInfo.seats}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={bookingInfo.email}
                onChange={handleInputChange}
              />
              <div
                className="container"
                style={{ justifyContent: "space-between" }}
              >
                {" "}
                <button type="submit">Submit</button>
                <button className="close-popup" onClick={togglePopup}>
                  Close
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    )
  );
};

export default Summary;
