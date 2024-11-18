import React from "react";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import UserContextProvider from "./components/UserContextProvider";
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <RequireAuth>
          <Home />
        </RequireAuth>
      }/>
    </Route>
  )
);

function App() {
  return(
    <UserContextProvider>
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />;
    </UserContextProvider>
  )
  
}

export default App;
