import { AuthProvider, useAuth } from "./context/AuthContext";
import Spinner from "./component/Spinner";
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
import HrPage from "./pages/HrPage";
import HrComplaintPage from "./Features/Hr/HrComplaintPage";

// Decides what the "home" route shows, based on role.
const RoleBasedHome = () => {
  const { loading, error, user } = useAuth();

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Please log in</div>;

  return user.is_hr ? <HrPage /> : <Homepage />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<RoleBasedHome />} />
      <Route path="/complaint" element={<ComplaintsPage />} />
      <Route
        path="/submittedcomplaint/against-you"
        element={<SubmittedComplaintAgainstYou />}
      />
      <Route path="/submittedcomplaint" element={<SubmittedComplaint />} />
      <Route path="/hrpage" element={<HrPage />} />
      <Route path="/hrcomplaint" element={<HrComplaintPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
