import React from "react";
import ReactDOM from "react-dom/client";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "./main.scss";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primeicons/primeicons.css";
import AppEntry from "./AppEntry.tsx";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Provider store={store}>
        <AppEntry />
    </Provider>,
);
