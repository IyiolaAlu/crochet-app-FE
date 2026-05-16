import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextPage from "./context/ContextPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ContextPage>
        <App />
      </ContextPage>
    </StrictMode>
  </BrowserRouter>,
);
