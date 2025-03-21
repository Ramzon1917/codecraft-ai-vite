import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import GenerationPage from "./pages/GenerationPage";
import NotFound from "./pages/NotFound";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Suspense fallback={<p>Loading...</p>}>
          {import.meta.env.VITE_TEMPO && useRoutes(routes)}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/generate/:projectId" element={<GenerationPage />} />
            {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
