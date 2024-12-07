import React from "react";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import RequireAuth from "./components/RequireAuth";
import MainLayout from "./routes/MainLayout";
import About from "./routes/About";
import Notes from "./routes/Notes";
import CreateNewNote from "./routes/CreateNewNote";
import ViewNote from "./routes/ViewNote";
import UpdateNote from "./routes/UpdateNote";
import ErrorComponent from "./components/ErrorComponent";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <React.Suspense fallback={<div>...Loading</div>}>
              <MainLayout />
            </React.Suspense>
          </RequireAuth>
        }
      >
        <Route path="/" element={<About />} errorElement={<ErrorComponent />} />
        <Route path="/notes" element={<Notes />} errorElement={<ErrorComponent />} />
        <Route path="/createNewNote" element={<CreateNewNote />} errorElement={<ErrorComponent />} />
        <Route path="/notes/:id" element={<ViewNote />} errorElement={<ErrorComponent />} />
        <Route path="/notes/:id/edit" element={<UpdateNote />} errorElement={<ErrorComponent />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />;
}

export default App;
