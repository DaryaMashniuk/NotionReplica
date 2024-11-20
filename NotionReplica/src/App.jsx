import React from "react";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import UserContextProvider from "./components/UserContextProvider";
import RequireAuth from "./components/RequireAuth";
import MainLayout from "./routes/MainLayout";
import Notes from "./routes/Notes";
import About from "./routes/About";
import {Register, registerUserAction} from "./routes/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} action={registerUserAction}/>
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<About/>}/>
        <Route path="/notes" element={<Notes/>} />
      </Route>
    </>
  )
);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </UserContextProvider>
  );
}

export default App;
