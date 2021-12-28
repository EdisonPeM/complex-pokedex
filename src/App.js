import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PokeLoader from "./components/PokeLoader";

import PokeList from "./pages/PokeList";
import PokeDetails from "./pages/PokeDetails";
import PokeNotFound from "./pages/pokeNotFound";

import PokeHeader from "./components/PokeHeader";

// const PokeList = lazy(() => import("./pages/PokeList"));
// const PokeDetails = lazy(() => import("./pages/PokeDetails"));
// const PokeNotFound = lazy(() => import("./pages/pokeNotFound"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/:pokeName" element={<PokeHeader />} />
        <Route path="*" element={<PokeHeader />} />
      </Routes>

      <main className="position-relative h-100">
        <Suspense fallback={<PokeLoader fullSize />}>
          <Routes>
            <Route path="/" element={<PokeList />} />
            <Route path="/not-found" element={<PokeNotFound />} />
            <Route path="/:pokeName" element={<PokeDetails />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
