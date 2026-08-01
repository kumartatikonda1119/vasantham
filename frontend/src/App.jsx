import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WritingsPage from './pages/WritingsPage';
import PoemsPage from './pages/PoemsPage';
import AksharaPage from './pages/AksharaPage';
import CommentaryPage from './pages/CommentaryPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/writings" element={<WritingsPage />} />
            <Route path="/poems" element={<PoemsPage />} />
            <Route path="/meaning" element={<AksharaPage />} />
            <Route path="/commentary" element={<CommentaryPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
