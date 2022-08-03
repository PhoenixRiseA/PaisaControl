import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import React, { useContext } from "react";
import AuthContext from "./store/AuthContext";
import UserDetails from "./pages/UserDetails";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} exact></Route>
        {authCtx.isLoggedIn && <Route path="/home" element={<Home />} />}
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        {authCtx.isLoggedIn && (
          <Route path="/home/userDetails" element={<UserDetails />} />
        )}
        <Route path="*" element={<Navigate to="/auth" />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
