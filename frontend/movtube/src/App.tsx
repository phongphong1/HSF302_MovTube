import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages and components
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";
import MoviePlayer from "./pages/MoviePlayer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:id" element={<MovieDetail />} />
          <Route path="movies/watch/:episodeId" element={<MoviePlayer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
