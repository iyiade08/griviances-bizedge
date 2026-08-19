import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Homepage from "./pages/Homepage";
import ComplaintsPage from "./pages/ComplaintsPage";
import NotFoundPage from "./pages/NotFoundPage";
import SubmittedComplaint from "./pages/SubmittedComplaintPage";
import SubmittedComplaintAgainstYou from "./pages/SubmittedComplaintAgainstYou";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/complaint" element={<ComplaintsPage />} />
        <Route
          path="/submittedcomplaint/against-you"
          element={<SubmittedComplaintAgainstYou />}
        />

        <Route path="/submittedcomplaint" element={<SubmittedComplaint />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
