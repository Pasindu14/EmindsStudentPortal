import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Batches } from "./pages/Masters/batch/Batch";
import { Students } from "./pages/Masters/students/Students";
import { Courses } from "./pages/Masters/courses/Courses";
import { Exams } from "./pages/Masters/exams/Exams";
import { Jobs } from "./pages/Masters/jobs/Jobs";
import { Questions } from "./pages/Masters/questions/Questions";
import { FileUpload } from "./pages/Masters/events/Events";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppContainer from "./AppContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContainer />,
    children: [
      {
        path: "batches",
        element: <Batches />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "exams",
        element: <Exams />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "questions",
        element: <Questions />,
      },
      {
        path: "fileUpload",
        element: <FileUpload />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
