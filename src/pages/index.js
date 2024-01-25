import React from "react";
import Home from "./home";
import Header from "../components/header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <footer></footer>
    </>
  );
};

export default AppLayout;
