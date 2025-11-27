import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Star, Zap, Flame, Leaf, MessageCircle, Menu, ArrowRight, Instagram, ChevronLeft, ChevronRight, Music, Play } from 'lucide-react';
import { Button } from './components/Button';
import { Product, CartItem, CartContextType } from './types';

// --- DATA ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Crispy Salted Egg',
    flavor: 'Salted Egg',
    price: 10.00,
    description: 'Golden savory bliss. Real yolk, real curry leaves.',
    longDescription: 'The King of Flavors! We use real premium salted egg yolks, curry leaves, and a hint of chili to create a rich, savory explosion on our signature ultra-thin popiah skin.',
    imageColor: 'bg-brand-yellow',
    accentColor: 'text-brand-yellow',
    badge: 'BEST SELLER',
    images: ['/images/salted_egg.jpg', '/images/salted_egg1.jpeg', '/images/salted_egg2.jpeg']
  },
  {
    id: '2',
    name: 'Tangy Tomato Twist',
    flavor: 'Tomato',
    price: 10.00,
    description: 'Sweet, sour, and punchy. Love at first crunch.',
    longDescription: "A refreshing twist! Our Tangy Tomato flavor brings the perfect balance of sweet and sour notes. It's light, appetizing, and impossible to stop eating.",
    imageColor: 'bg-brand-red',
    accentColor: 'text-brand-red',
    badge: 'NEW ARRIVAL',
    images: ['/images/tomato.jpeg', '/images/tomato1.jpeg', '/images/tomato2.jpeg']
  },
  {
    id: '3',
    name: 'Cheesy Cheese',
    flavor: 'Cheese',
    price: 10.00,
    description: 'Intense cheesy dust. Finger-licking good.',
    longDescription: 'For the ultimate cheese lovers. We pack a massive punch of cheddar goodness onto our crispy skins. Savory, milky, and satisfyingly dusty.',
    imageColor: 'bg-brand-orange',
    accentColor: 'text-brand-orange',
    badge: 'KIDS LOVE IT',
    images: ['/images/cheese.jpeg', '/images/cheese1.jpeg']
  }
];

// --- CONTEXT ---
const CartContext = createContext<CartContextType | null>(null);

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

// --- COMPONENTS ---

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-brand-cream/90 backdrop-blur-sm border-b-2 border-brand-dark/5">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
             {/* Logo Icon */}
            <div className="w-10 h-10 bg-brand-dark rounded-lg flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform overflow-hidden">
              <img 
                src="/images/logo.png" 
                alt="KK Cheese Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="font-display text-2xl text-brand-dark tracking-wide">KK CHEESE</span>
          </Link>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <ShoppingBag className="text-brand-dark" size={24} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-black/5 rounded-full"
            >
              {isMenuOpen ? <X size={24}/> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-brand-cream pt-20 px-4 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              <Link to="/" className="text-3xl font-display text-brand-dark hover:text-brand-red">HOME</Link>
              <Link to="/products" className="text-3xl font-display text-brand-dark hover:text-brand-red">SNACKS</Link>
              <Link to="/about" className="text-3xl font-display text-brand-dark hover:text-brand-red">OUR STORY</Link>
              <div className="h-px bg-brand-dark/10 w-20 mx-auto my-4"></div>
              <p className="text-sm font-bold text-brand-dark/50">FOLLOW US</p>
              <div className="flex justify-center gap-4">
                <a href="https://www.instagram.com/kkcheese.my" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center hover:bg-brand-red transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.tiktok.com/@kk.cheese.my" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center hover:bg-brand-red transition-colors">
                  <Music size={20} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100081701370372" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center hover:bg-brand-red transition-colors">
                  <span className="text-lg font-bold">f</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const CartSidebar = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-brand-dark z-50 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-cream z-50 flex flex-col border-l-4 border-brand-dark"
          >
            <div className="p-6 border-b-2 border-brand-dark flex justify-between items-center bg-brand-yellow">
              <h2 className="font-display text-2xl text-brand-dark uppercase tracking-wide">Your Stash</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-black/10 rounded-full border-2 border-brand-dark bg-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center opacity-60">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={40} className="text-gray-400" />
                  </div>
                  <p className="font-display text-xl">EMPTY STASH!</p>
                  <p className="text-sm">You can't binge watch without snacks.</p>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-white p-3 rounded-xl border-2 border-brand-dark shadow-[4px_4px_0px_0px_rgba(45,37,32,1)]"
                  >
                    <div className={`w-20 h-20 rounded-lg ${item.imageColor} flex-shrink-0 border-2 border-brand-dark overflow-hidden`}>
                       <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-display text-lg text-brand-dark leading-5">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-brand-red">
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="flex items-end justify-between mt-2">
                        <p className="font-bold text-brand-dark">RM {item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1 border border-brand-dark">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="font-display text-sm w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 border-t-2 border-brand-dark bg-white">
              <div className="flex justify-between items-center mb-6">
                <span className="font-display text-xl text-brand-dark">Total</span>
                <span className="font-display text-3xl text-brand-red">RM {cartTotal.toFixed(2)}</span>
              </div>
              <Button 
                fullWidth
                variant="black"
                disabled={cart.length === 0}
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
              >
                Checkout Now
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProductCard: React.FC<{ product: Product, compact?: boolean }> = ({ product, compact }) => {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className={`relative flex flex-col h-full bg-white border-2 border-brand-dark rounded-2xl p-4 shadow-hard transition-transform hover:-translate-y-1 ${compact ? 'min-w-[280px] w-[280px] md:w-full' : 'w-full'}`}>
      {/* Badge */}
      <div className="absolute -top-3 -right-3 z-10 rotate-3">
        <span className={`inline-block px-3 py-1 ${product.imageColor} border-2 border-brand-dark text-brand-dark font-display text-sm uppercase tracking-wider shadow-sm`}>
          {product.badge}
        </span>
      </div>

      {/* Image Area - Pop out effect with carousel */}
      <div className={`relative w-full aspect-square mb-4 rounded-xl overflow-hidden border-2 border-brand-dark group`}>
        <div className={`absolute inset-0 ${product.imageColor} opacity-20 z-0`}></div>
        
        {/* Image with animation */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={product.images[currentImageIndex]}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Navigation Arrows - Show only if multiple images */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-2 border-brand-dark rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-hard active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-brand-dark" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-2 border-brand-dark rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-hard active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-brand-dark" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full border border-brand-dark transition-all ${
                    index === currentImageIndex
                      ? 'bg-brand-dark w-6'
                      : 'bg-white/80 hover:bg-white'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-brand-yellow text-brand-yellow" />)}
        </div>
        <h3 className="font-display text-2xl text-brand-dark leading-none mb-2">{product.flavor}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1 font-medium">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-xl text-brand-dark">RM {product.price}</span>
          <Button size="sm" onClick={() => addToCart(product)} icon={<Plus size={16}/>}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

const VideoCard: React.FC<{ video: { id: number, title: string, description: string, video: string } }> = ({ video }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="relative w-full aspect-[9/16] bg-brand-dark rounded-xl md:rounded-2xl overflow-hidden border-2 border-brand-dark shadow-hard cursor-pointer group"
        whileHover={{ y: -5 }}
        whileTap={{ y: 0 }}
        onClick={() => setIsOpen(true)}
      >
        <video
          src={video.video}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          muted
          preload="metadata"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center border-2 border-brand-dark text-brand-dark shadow-hard group-hover:scale-110 transition-transform"
          >
            <Play size={20} className="md:w-8 md:h-8" fill="currentColor" />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 md:p-4">
          <h3 className="text-brand-cream font-display text-xs md:text-lg text-center drop-shadow-md mb-1">
            {video.title}
          </h3>
          <p className="text-brand-cream/80 text-xs md:text-sm text-center drop-shadow-md">
            {video.description}
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-sm aspect-[9/16] bg-brand-dark rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={video.video}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full text-brand-dark hover:bg-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- PAGES ---

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="overflow-x-hidden pt-16">
      {/* Progress Bar */}
      <motion.div className="fixed top-16 left-0 right-0 h-1 bg-brand-red origin-left z-30" style={{ scaleX }} />

      {/* Hero Section */}
      <section className="relative px-4 pt-8 pb-16 md:pt-20 md:pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Mobile: Image Top, Desktop: Image Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="w-full md:w-1/2 md:order-2 relative"
            >
              {/* Abstract decorative shapes behind image */}
              <div className="absolute inset-0 bg-brand-yellow rounded-full blur-3xl opacity-30 animate-pulse"></div>
              
              {/* Hero Image */}
              <img 
                src="/images/hero1.PNG" 
                alt="KK Cheese Hero" 
                className="relative z-10 w-full max-w-[400px] mx-auto drop-shadow-2xl hover:scale-105 transition-transform cursor-pointer"
              />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-10 right-0 md:right-10 bg-white border-2 border-brand-dark p-3 rounded-xl shadow-hard z-20 rotate-6"
              >
                <p className="font-display text-center leading-none">
                  <span className="text-2xl block text-brand-red">100%</span>
                  <span className="text-sm text-brand-dark">CRISPY</span>
                </p>
              </motion.div>
            </motion.div>

            <div className="w-full md:w-1/2 md:order-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 border border-brand-dark/20 bg-white px-3 py-1 rounded-full mb-4">
                  <Flame size={14} className="text-brand-orange fill-brand-orange" />
                  <span className="text-xs font-bold tracking-widest text-brand-dark">HOT SELLING MALAYSIA</span>
                </div>
                
                <h1 className="font-display text-6xl md:text-8xl text-brand-dark leading-[0.85] mb-6">
                  CAN'T STOP<br/>
                  <span className="text-brand-red text-outline-white">WON'T STOP</span>
                </h1>
                <p className="text-lg text-brand-dark/70 font-medium mb-8 max-w-md mx-auto md:mx-0">
                  Thin. Crispy. Addictive. The ultimate drama-chasing companion.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/products" className="w-full sm:w-auto">
                    <Button size="lg" icon={<ArrowRight />} fullWidth>Shop Now</Button>
                  </Link>
                </div>
                
                {/* Halal Certification - Smaller and below button */}
                <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green px-3 py-1 rounded-lg mt-4">
                  <img 
                    src="/images/halal.png" 
                    alt="Halal Certified" 
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-xs font-medium text-brand-green">HALAL CERTIFIED</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee - Memphis Style */}
      <div className="bg-brand-dark text-brand-yellow py-3 overflow-hidden border-y-4 border-brand-dark rotate-1 md:rotate-0 scale-105">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
           {[...Array(10)].map((_, i) => (
             <span key={i} className="font-display text-2xl md:text-4xl tracking-widest flex items-center gap-4">
               KULIT KULIT <Star className="fill-brand-red text-brand-red" size={20} />
             </span>
           ))}
        </div>
      </div>

      {/* Horizontal Scroll Products (Mobile First UX) */}
      <section className="py-16 bg-white border-b-2 border-brand-dark/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-display text-4xl text-brand-dark mb-1">OUR FLAVORS</h2>
              <p className="text-gray-500 font-medium">Swipe to find your addiction 👉</p>
            </div>
            <Link to="/products" className="hidden md:block font-bold underline decoration-2 decoration-brand-red underline-offset-4 hover:text-brand-red">View All</Link>
          </div>
          
          {/* Horizontal Scroller Container */}
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="snap-center">
                <ProductCard product={product} compact />
              </div>
            ))}
          </div>

          <Link to="/products" className="md:hidden block mt-4">
            <Button variant="outline" fullWidth>View All Flavors</Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us - Grid */}
      <section className="py-16 bg-brand-cream">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-center text-4xl mb-12">WHY WE ARE BUILT DIFFERENT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Paper Thin", desc: "Hand-fried to perfection, lighter than air.", color: "bg-brand-yellow" },
              { title: "Flavor Bomb", desc: "No skimping on seasoning. Every bite hits.", color: "bg-brand-red" },
              { title: "Local Pride", desc: "Made in Malaysia, for Malaysian tastebuds.", color: "bg-brand-orange" },
              { title: "Halal Certified", desc: "Verified halal ingredients and processes.", color: "bg-brand-green", icon: "/images/halal.png" },
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-2xl border-2 border-brand-dark shadow-hard ${item.color}`}>
                {item.icon && (
                  <img 
                    src={item.icon} 
                    alt={item.title} 
                    className="w-8 h-8 object-contain mb-2"
                  />
                )}
                <h3 className="font-display text-2xl text-brand-dark mb-2">{item.title}</h3>
                <p className="font-medium text-brand-dark/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-brand-dark mb-4">WATCH US IN ACTION</h2>
            <p className="text-lg text-gray-600 font-medium">See how crispy and delicious our Kulit Kulit really is!</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { 
                id: 1, 
                title: "Taste Test", 
                description: "First bite reaction", 
                video: "/images/video1.mp4"
              },
              { 
                id: 2, 
                title: "Crispy Crunch", 
                description: "Listen to that crunch!", 
                video: "/images/video2.mp4"
              },
              { 
                id: 3, 
                title: "Making Process", 
                description: "How we make it", 
                video: "/images/video3.mp4"
              },
              { 
                id: 4, 
                title: "Product Showcase", 
                description: "All flavors featured", 
                video: "/images/video4.mp4"
              }
            ].map((item) => (
              <VideoCard key={item.id} video={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Teaser */}
      <section className="py-20 px-4 bg-brand-dark text-brand-cream text-center">
        <h2 className="font-display text-5xl md:text-7xl mb-6">HUNGRY YET?</h2>
        <Link to="/products">
          <Button variant="secondary" size="lg" className="mx-auto">
            Get Your Fix
          </Button>
        </Link>
      </section>
    </div>
  );
};

const ProductsPage = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-display text-brand-dark mb-4">THE LINEUP</h1>
          <p className="text-xl font-medium text-gray-500">Warning: Highly Addictive.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-brand-cream">
      <div className="container mx-auto px-4 max-w-3xl">
         <div className="rounded-2xl border-2 border-brand-dark shadow-hard overflow-hidden mb-8">
          <img src="https://placehold.co/800x400/2D2520/FFFFFF?text=Our+Kitchen" alt="Kitchen" className="w-full object-cover" />
        </div>

        <article className="prose prose-lg prose-headings:font-display prose-headings:text-brand-dark text-brand-dark/80 mx-auto">
          <h1 className="text-5xl text-center mb-8">THE KULIT KULIT STORY</h1>
          <p className="lead font-medium text-xl text-center mb-8">
            "We were tired of boring potato chips. So we made something better."
          </p>
          
          <div className="bg-white p-8 rounded-2xl border-2 border-brand-dark shadow-hard mb-8 rotate-1">
             <p>
              It started with a simple craving. Late night, good drama, but the snacks were lacking. We wanted something thinner, crispier, and packed with real Malaysian flavors.
            </p>
            <p className="mt-4 font-bold">
              Enter the Popiah Skin.
            </p>
          </div>

          <h3 className="text-3xl text-brand-red">Why Popiah Skin?</h3>
          <p>Unlike potato chips, fried popiah skin (spring roll pastry) has a unique, shattering crunch. It's light as air but holds seasoning perfectly. We hand-fry small batches to ensure every piece is golden.</p>
        </article>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const { cart, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWhatsAppLink = () => {
    const phoneNumber = "60178993899";
    
    // Build message content
    let messageLines = [
      "Hi KK Cheese! 🧀 I'd like to place an order:",
      "",
      "📦 *ORDER DETAILS:*"
    ];
    
    // Add order items
    cart.forEach(item => {
      const itemTotal = (item.price * item.quantity).toFixed(2);
      messageLines.push(`• ${item.quantity}x ${item.name} - RM ${itemTotal}`);
    });
    
    messageLines.push("");
    messageLines.push(`💰 *Total: RM ${cartTotal.toFixed(2)}*`);
    messageLines.push("");
    messageLines.push("👤 *Customer Details:*");
    messageLines.push(`Name: ${formData.name}`);
    messageLines.push(`Phone: ${formData.phone}`);
    messageLines.push(`Address: ${formData.address}`);
    
    if(formData.notes) {
      messageLines.push(`Notes: ${formData.notes}`);
    }
    
    messageLines.push("");
    messageLines.push("Thank you! 😊");
    
    // Join and encode the message
    const message = encodeURIComponent(messageLines.join('\n'));
    
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  const handleWhatsAppOrder = () => {
    const whatsappUrl = generateWhatsAppLink();
    console.log('WhatsApp URL:', whatsappUrl); // Debug log
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center bg-brand-cream px-4 text-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <ShoppingBag size={64} className="text-gray-400" />
        </div>
        <h2 className="text-4xl font-display text-brand-dark mb-4">YOUR CART IS EMPTY</h2>
        <p className="text-lg text-gray-500 mb-8">Go add some crunch to your life.</p>
        <Link to="/products">
          <Button size="lg">Go Get Snacks</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-brand-cream">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-display text-brand-dark mb-8 text-center md:text-left">FINALIZE YOUR ORDER</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-brand-dark shadow-hard h-fit order-2 lg:order-1">
            <h2 className="text-2xl font-display mb-6 flex items-center gap-2">
              <ShoppingBag className="text-brand-red" /> WHAT YOU'RE GETTING
            </h2>
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b-2 border-brand-dark/5 last:border-0">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-brand-dark/20">
                      <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-brand-dark leading-tight">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold font-display text-lg">RM {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-dashed border-brand-dark pt-4">
               <div className="flex justify-between items-center text-2xl font-display text-brand-dark">
                <span>TOTAL</span>
                <span className="text-brand-red">RM {cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Details Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-brand-yellow p-6 md:p-8 rounded-3xl border-2 border-brand-dark shadow-hard">
              <h2 className="text-2xl font-display mb-6 text-brand-dark">DELIVERY DETAILS</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-1 uppercase">Full Name</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-brand-dark focus:shadow-hard focus:translate-x-[-2px] focus:translate-y-[-2px] outline-none transition-all placeholder:text-gray-400"
                    placeholder="e.g. Ali Baba"
                  />
                </div>
                 <div>
                  <label className="block text-sm font-bold text-brand-dark mb-1 uppercase">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-brand-dark focus:shadow-hard focus:translate-x-[-2px] focus:translate-y-[-2px] outline-none transition-all placeholder:text-gray-400"
                    placeholder="e.g. 017 899 3899"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-1 uppercase">Address</label>
                  <textarea 
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-brand-dark focus:shadow-hard focus:translate-x-[-2px] focus:translate-y-[-2px] outline-none transition-all placeholder:text-gray-400"
                    placeholder="Where should we send the snacks?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-1 uppercase">Notes</label>
                  <input 
                    type="text" 
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-brand-dark focus:shadow-hard focus:translate-x-[-2px] focus:translate-y-[-2px] outline-none transition-all placeholder:text-gray-400"
                    placeholder="Optional message..."
                  />
                </div>

                <div className="pt-6">
                  {formData.name && formData.address && formData.phone ? (
                    <Button 
                      variant="whatsapp" 
                      fullWidth 
                      size="lg" 
                      icon={<MessageCircle />}
                      onClick={handleWhatsAppOrder}
                    >
                      ORDER VIA WHATSAPP
                    </Button>
                  ) : (
                    <Button variant="black" fullWidth disabled className="opacity-50 cursor-not-allowed">
                      FILL DETAILS TO ORDER
                    </Button>
                  )}
                  <p className="text-center text-xs font-bold text-brand-dark/60 mt-4 uppercase">
                    You'll be redirected to WhatsApp to confirm
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-brand-dark text-brand-cream py-12 border-t-8 border-brand-red">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 bg-brand-cream rounded-lg flex items-center justify-center mb-3">
          <img 
            src="/images/logo.png" 
            alt="KK Cheese Logo" 
            className="w-12 h-12 object-contain"
          />
        </div>
        <h2 className="font-display text-4xl">KK CHEESE</h2>
      </div>
      <p className="text-brand-cream/60 text-sm mb-8 max-w-sm mx-auto">
        The crispiest, most addictive popiah skin snacks in Malaysia. Once you start, you can't stop.
      </p>
      
      <div className="flex justify-center gap-6 mb-8">
        <a href="https://www.instagram.com/kkcheese.my" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-brand-cream flex items-center justify-center hover:bg-brand-cream hover:text-brand-dark transition-colors">
          <Instagram size={20} />
        </a>
        <a href="https://www.tiktok.com/@kk.cheese.my" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-brand-cream flex items-center justify-center hover:bg-brand-cream hover:text-brand-dark transition-colors">
          <Music size={20} />
        </a>
        <a href="https://www.facebook.com/profile.php?id=100081701370372" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-brand-cream flex items-center justify-center hover:bg-brand-cream hover:text-brand-dark transition-colors">
          <span className="text-lg font-bold">f</span>
        </a>
        <a href="https://wa.me/60178993899" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-brand-cream flex items-center justify-center hover:bg-brand-cream hover:text-brand-dark transition-colors">
          <MessageCircle size={20} />
        </a>
      </div>
      
      <p className="text-xs text-brand-cream/30 font-bold uppercase tracking-widest">
        &copy; 2025 KK Cheese Brand. All rights reserved.
      </p>
    </div>
  </footer>
);

// --- MAIN APP ---

const App: React.FC = () => {
  return (
    <HashRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen font-sans text-brand-dark">
          <Navbar />
          <CartSidebar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </HashRouter>
  );
};

export default App;
