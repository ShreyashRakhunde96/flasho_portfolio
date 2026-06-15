import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// Admin imports
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Messages from './pages/admin/Messages';
import AdminServices from './pages/admin/Services';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-secondary text-white font-body overflow-x-hidden">
        <Routes>
          {/* Admin Routes */}
          <Route path="/flasho" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="messages" element={<Messages />} />
            <Route path="services" element={<AdminServices />} />
          </Route>

          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/service/:id" element={<ServicePage />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
