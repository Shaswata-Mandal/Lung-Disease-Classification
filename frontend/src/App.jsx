import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PredictPage from './pages/PredictPage';
import ResultPage from './pages/ResultPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

/* Scrolls to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/* Inner layout — inside BrowserRouter so hooks work */
function AppInner() {
  return (
    <div className="min-h-screen bg-[#06070e] text-white overflow-x-hidden w-full">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/predict"  element={<PredictPage />} />
          <Route path="/result"   element={<ResultPage />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="*"         element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
