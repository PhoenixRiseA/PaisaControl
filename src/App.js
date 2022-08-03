import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} exact></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
