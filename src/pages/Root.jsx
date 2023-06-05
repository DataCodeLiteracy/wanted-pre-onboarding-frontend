import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Todo from "./Todo";

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>

      <Route path="/signup" element={<Navigate to="/auth/signup" />} />
      <Route path="/auth/signup" element={<Signup />} />

      <Route path="/signin" element={<Navigate to="/auth/signin" />} />
      <Route path="/auth/signin" element={<Signin />} />

      <Route path="/todo" element={<Navigate to="/todos" />} />
      <Route path="/todos" element={<Todo />} />

      <Route path="/todos" element={<Todo />} />
    </Routes>
  );
}
