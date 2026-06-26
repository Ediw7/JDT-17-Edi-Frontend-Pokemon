import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, Star } from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'My Pokemon', path: '/my-pokemon', icon: Star }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-black transition-colors duration-300 flex flex-col font-sans relative overflow-hidden">
      <nav className="bg-white border-b-[3px] border-black shadow-[0_4px_0_0_#000] sticky top-0 z-50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3 hover:-translate-y-1 hover:scale-105 transition-all">
                <img className="h-10 w-auto group-hover:rotate-180 transition-transform duration-500" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokeball" />
                <span className="font-black text-2xl tracking-wider text-[#ffcb05]" style={{ WebkitTextStroke: '1px black' }}>PokemonEdi</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all border-[3px] ${
                    isActive(link.path)
                      ? 'bg-[#ccff00] text-black border-black shadow-[3px_3px_0_0_#000] -translate-y-1'
                      : 'border-transparent text-black hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 relative z-10">
        <Outlet />
      </main>

      <footer className="bg-white border-t-[4px] border-black pt-8 pb-28 md:py-8 mt-auto z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img className="h-6 w-auto grayscale" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokeball" />
            <span className="font-black text-lg text-black">PokemonEdi</span>
          </div>
          <p className="text-black font-bold text-sm text-center md:text-left">
            © {new Date().getFullYear()} Edi Wicoro. All rights reserved.
          </p>
          <div className="flex gap-3">
            <span className="px-4 py-1.5 bg-[#ccff00] text-black text-xs font-black border-[2px] border-black rounded-lg shadow-[2px_2px_0_0_#000]">JDT-17</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-[3px] border-black z-50 px-2 py-2 flex justify-around items-center pb-4 shadow-[0_-4px_0_0_rgba(0,0,0,0.1)]">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex flex-col items-center justify-center w-full py-1 transition-all ${
                active ? 'text-black translate-y-[-4px]' : 'text-gray-500 hover:text-black'
              }`}
            >
              <div className={`p-2 rounded-xl border-[2px] transition-all ${
                active 
                  ? 'bg-[#ccff00] border-black shadow-[2px_2px_0_0_#000]' 
                  : 'border-transparent bg-transparent'
              }`}>
                <Icon size={24} strokeWidth={active ? 3 : 2} />
              </div>
              <span className={`text-[10px] font-black mt-1 ${active ? 'text-black' : 'text-gray-500'}`}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Layout;
