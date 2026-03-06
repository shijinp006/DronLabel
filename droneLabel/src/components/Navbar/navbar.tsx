export const Navbar = () => {
  return (
    <nav className="w-full h-14 md:h-16 bg-yellow-400 flex items-center">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative">

        {/* Hamburger */}
        <button className="flex flex-col gap-[5px] p-1 group cursor-pointer">
          <span className="block w-5 md:w-[22px] h-[2px] bg-black transition-transform duration-200 group-hover:translate-x-[3px]" />
          <span className="block w-5 md:w-[22px] h-[2px] bg-black transition-transform duration-200 group-hover:-translate-x-[3px]" />
          <span className="block w-5 md:w-[22px] h-[2px] bg-black transition-transform duration-200 group-hover:translate-x-[3px]" />
        </button>

        {/* Logo — absolutely centered */}
        <span className="absolute left-1/2 -translate-x-1/2 font-black text-[13px] md:text-[17px] tracking-widest text-black uppercase select-none whitespace-nowrap">
          MYDESIGNATION
        </span>

        {/* Right Icons */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Search — always visible */}
          <button className="p-1 text-black hover:scale-110 transition-transform duration-150 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="md:w-5 md:h-5" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* User — hidden on mobile */}
          <button className="hidden md:flex p-1 text-black hover:scale-110 transition-transform duration-150 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Wishlist — hidden on mobile */}
          <button className="hidden md:flex p-1 text-black hover:scale-110 transition-transform duration-150 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Cart — always visible */}
          <button className="p-1 text-black hover:scale-110 transition-transform duration-150 cursor-pointer relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="md:w-5 md:h-5" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>

        </div>
      </div>
    </nav>
  );
};