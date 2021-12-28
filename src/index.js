import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { PokeCtxProvider } from "./context/PokeCtx";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <PokeCtxProvider>
        <App />
      </PokeCtxProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
