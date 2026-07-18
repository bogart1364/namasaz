import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './i18n/LanguageContext';
import Scene from './components/3d/Scene';
import Overlay from './components/ui/Overlay';
import Navigation from './components/ui/Navigation';
import Projects from './components/sections/Projects';
import Products from './components/sections/Products';
import AllProducts from './components/sections/AllProducts';
import About from './components/sections/About';
import Articles from './components/sections/Articles';
import Footer from './components/sections/Footer';

export default function App() {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>();

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
      <div className="relative w-full h-full bg-[#0a0a0a]">
        <Scene />
        <Navigation onProductsClick={() => openAllProducts()} />

        {/* Scroll container */}
        <div id="scroll-container" className="fixed inset-0 z-10 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          <style>{`#scroll-container::-webkit-scrollbar { display: none; }`}</style>

          {/* 3D Section - Overlay manages its own 300vh for scroll-driven concepts */}
          <Overlay />

          {/* Content sections */}
          <Projects />
          <Products onOpenAll={openAllProducts} />
          <About />
          <Articles />
          <Footer />
        </div>

        {/* All Products overlay */}
        <AnimatePresence>
          {showAllProducts && (
            <AllProducts onClose={closeAllProducts} initialProductId={selectedProductId} />
          )}
        </AnimatePresence>
      </div>
    </LanguageProvider>
  );
}
