import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";

function App() {
  const storedToken = sessionStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!storedToken);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={
            <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
