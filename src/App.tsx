import React from "react";
import { HomePage } from "./pages/HomePage";
import { FavouritesPage } from "./pages/FavoritesPage";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";

export const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/favorites" element={<FavouritesPage />} />
      </Routes>
    </>
  );
};
