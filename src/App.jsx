import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/home/home";
import "./App.css";
import Summary from "./pages/Summary/Summary";
function App() {
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
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Home movielist={movielist} />} path="/"></Route>
          <Route
            path="/details/:showId"
            element={<Summary movielist={movielist} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
