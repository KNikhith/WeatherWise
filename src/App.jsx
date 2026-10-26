
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Forecast from "./pages/Forecast";
import SavedLocations from "./pages/SavedLocations";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/forecast" element={<Forecast />} />

          <Route path="/locations" element={<SavedLocations />} />

          <Route
            path="/settings"
            element={<main className="page-placeholder"><h1>Settings</h1><p>Weatherwise preferences will be available here.</p></main>}
          />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
