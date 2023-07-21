import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "./features/auth/LoginPage";
import LayoutPage from "./features/layout/LayoutPage";
import ArticlesPage from "./features/articles/ArticlesPage";
import HospitalsPage from "./features/hospitals/HospitalsPage";
import AddHospitalForm from "./features/hospitals/AddHospitalForm";
import ConfigurationPage from "./features/configurations/ConfigurationPage";
import AmbulancesPage from "./features/ambulances/AmbulancesPage";
import AddArticleForm from "./features/articles/AddArticleForm";
import AddAmbulanceForm from "./features/ambulances/AddAmbulanceForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard", //
    element: <LayoutPage />,
    children: [
      {
        path: "articles", // /dashboard/articles
        element: <ArticlesPage />,
      },
      {
        path: "ambulances",
        element: <AmbulancesPage />,
      },
      {
        path: "hospitals/:window/:status",
        element: <HospitalsPage />,
      },
      {
        path: "addarticle",
        element: <AddArticleForm />,
      },
      {
        path: "addarticle/:id",
        element: <AddArticleForm />,
      },
      {
        path: "addambulance",
        element: <AddAmbulanceForm />,
      },
      {
        path: "addambulance/:id",
        element: <AddAmbulanceForm />,
      },
      {
        path: "addhospitals/:window/:status",
        element: <AddHospitalForm />,
      },
      {
        path: "addhospitals/:window/:status/:id",
        element: <AddHospitalForm />,
      },
      {
        path: "configurations",
        element: <ConfigurationPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
