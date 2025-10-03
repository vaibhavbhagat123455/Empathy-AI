import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header"; // Import Header

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header /> {/* Header will appear on all pages */}
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
