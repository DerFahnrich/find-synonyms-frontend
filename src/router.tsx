import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { App } from "./App";
import { AddSynonyms, Synonyms } from "./components";

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index element={<Synonyms />} />
      <Route path="add-synonym" element={<AddSynonyms />} />
    </Route>,
  ])
);
