import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventCategoryPage from "./pages/EventCategoryPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="bg-amber-100 min-h-screen w-screen overflow-x-hidden flex flex-col">
        {/* Navigation Bar - Added sticky positioning and shadow */}
        <div className="sticky top-0 z-50 bg-amber-100 shadow-md">
          <Navbar />
        </div>

        {/* Main Content - Added flex grow and padding */}
        <main className="flex-grow py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Events Routes */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/category/:categoryName" element={<EventCategoryPage />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
            
            {/* Search Route */}
            <Route path="/search/:query" element={<SearchResultsPage />} />
            
            {/* Other Routes */}
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
