import React from "react";
import { Outlet } from "react-router-dom";
import NavegationAll from "../Elements/NavegationAll";

const Navegacao = () => {
  return (
    <>
      <div className="flex flex-col">
      <NavegationAll/>

        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navegacao;
