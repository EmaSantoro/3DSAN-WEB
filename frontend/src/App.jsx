import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import ServicioDetalle from './pages/ServicioDetalle';
import TrabajoDetalle from './pages/TrabajoDetalle';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
        transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1] 
        }}
    >
        {children}
    </motion.div>
);

function AppContent() {
    const location = useLocation();
    return (
        <>
            <ScrollToTop />
            <ScrollToHash />
            <CustomCursor />
            <ScrollProgress />
            <WhatsAppButton />
            <Navbar />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
                    <Route path="/servicios/:slug" element={<PageWrapper><ServicioDetalle /></PageWrapper>} />
                    <Route path="/trabajos/:id" element={<PageWrapper><TrabajoDetalle /></PageWrapper>} />
                    <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
                </Routes>
            </AnimatePresence>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}