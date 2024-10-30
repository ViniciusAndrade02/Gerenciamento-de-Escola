import React from "react";
import { Outlet } from "react-router-dom";
import NavegationAll from "../Elements/NavegationAll";

const Navegacao = () => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
      <NavegationAll/>

        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navegacao;
