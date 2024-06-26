import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { YMaps } from "@pbe/react-yandex-maps";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <YMaps
      query={{
        lang: "ru_RU",
        coordorder: "latlong",
        apikey: "f350c3e7-a0ff-4eab-b0ec-c1e91e7ad76b",
      }}
    >
      <App />
    </YMaps>
  </React.StrictMode>
);
