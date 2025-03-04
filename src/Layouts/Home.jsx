import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Navbar userName={userName} />
      {/* <h1>Home</h1> */}
      <main>
        <Outlet />
      </main>
      <img src="/wave.svg" alt="footer image" />
    </div>
  );
};

export default Home;
