import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

// Admin imports
import { AuthProvider } from './admin/context/AuthContext';
import { ToastProvider } from './admin/context/ToastContext';
import AdminLayout from './admin/components/AdminLayout';
import {
  Login,
  Dashboard,
  Appointments,
  Services as AdminServices,
  Team,
  Testimonials as AdminTestimonials,
  FAQs,
  Gallery as AdminGallery,
  Messages,
} from './admin/pages';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route
          path="/*"
          element={
            <div className="font-sans antialiased">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            <AuthProvider>
              <ToastProvider>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="team" element={<Team />} />
                    <Route path="testimonials" element={<AdminTestimonials />} />
                    <Route path="faqs" element={<FAQs />} />
                    <Route path="gallery" element={<AdminGallery />} />
                    <Route path="messages" element={<Messages />} />
                  </Route>
                </Routes>
              </ToastProvider>
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
