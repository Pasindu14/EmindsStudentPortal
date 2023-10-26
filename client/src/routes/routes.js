import { Batches } from "../pages/Masters/batch/Batch";
import { Students } from "../pages/Masters/students/Students";
import { Courses } from "../pages/Masters/courses/Courses";
import { Exams } from "../pages/Masters/exams/Exams";
import { Jobs } from "../pages/Masters/jobs/Jobs";
import { Questions } from "../pages/Masters/questions/Questions";
import { Events } from "../pages/Masters/events/Events";
import { BatchMapping } from "../pages/BatchMapping/BatchMapping";

import AppContainer from "../AppContainer";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
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
        element: <Events />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "batch-mapping",
        element: <BatchMapping />,
      },
    ],
  },
]);
