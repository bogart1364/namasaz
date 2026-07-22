import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './i18n/LanguageContext';
import Scene from './components/3d/Scene';
import Overlay from './components/ui/Overlay';
import Navigation from './components/ui/Navigation';
import LoadingScreen from './components/ui/LoadingScreen';
import SceneErrorBoundary from './components/ui/SceneErrorBoundary';
import MagneticCursor from './components/ui/MagneticCursor';
import Projects from './components/sections/Projects';
import Products from './components/sections/Products';
import AllProducts from './components/sections/AllProducts';
import About from './components/sections/About';
import Articles from './components/sections/Articles';
import AllArticles from './components/sections/AllArticles';
import Footer from './components/sections/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>();
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    setIsDesktop(window.matchMedia('(pointer: fine)').matches);
    return () => clearTimeout(timer);
  }, []);

  const openAllProducts = (productId?: string) => {
    setSelectedProductId(productId);
    setShowAllProducts(true);
  };

  const closeAllProducts = () => {
    setShowAllProducts(false);
    setSelectedProductId(undefined);
  };

  return (
    <LanguageProvider>
      <LoadingScreen isLoading={isLoading} />
      {isDesktop && <MagneticCursor />}

      <div className="relative w-full h-full bg-[#0a0a0a]">
        <SceneErrorBoundary>
          <Scene />
        </SceneErrorBoundary>
        <Navigation onProductsClick={() => openAllProducts()} />

        {/* Scroll container */}
        <div id="scroll-container" className="fixed inset-0 z-10 overflow-y-auto hide-scrollbar">

          {/* 3D Section - Overlay manages its own 300vh for scroll-driven concepts */}
          <Overlay />

          {/* Content sections */}
          <Projects />
          <Products onOpenAll={openAllProducts} />
          <About />
          <Articles onOpenAll={() => setShowAllArticles(true)} />
          <Footer />
        </div>

        {/* All Products overlay */}
        <AnimatePresence>
          {showAllProducts && (
            <AllProducts onClose={closeAllProducts} initialProductId={selectedProductId} />
          )}
        </AnimatePresence>

        {/* All Articles page */}
        <AnimatePresence>
          {showAllArticles && (
            <AllArticles onClose={() => setShowAllArticles(false)} />
          )}
        </AnimatePresence>
      </div>
    </LanguageProvider>
  );
}
