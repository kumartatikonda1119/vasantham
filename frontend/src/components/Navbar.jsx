import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'హోమ్', path: '/' },
    { name: 'గురించి', path: '/about' },
    { name: 'అక్షరార్థం', path: '/meaning' },
    { name: 'రచనలు', path: '/writings' },
    { name: 'కవితలు', path: '/poems' },
    { name: 'వ్యాఖ్యానం', path: '/commentary' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#F6EEDF]/95 backdrop-blur-md border-b border-[#E6D7BD] py-3 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 group">
          <span className="font-serif text-2xl md:text-3xl font-bold text-[#3B6533] tracking-wide drop-shadow-sm">
            వసంతం
          </span>
          {/* Bird motif on logo */}
          <span className="text-[#A08530] text-sm transform -rotate-12 group-hover:rotate-0 transition-transform">
            🕊️
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-7 lg:space-x-9">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans text-base font-medium transition-colors relative pb-1.5 ${
                  isActive
                    ? 'text-[#3B6533] font-semibold'
                    : 'text-[#5C4328] hover:text-[#3B6533]'
                }`}
              >
                {link.name}
                {/* Reference active indicator line with diamond ornament */}
                {isActive && (
                  <div className="absolute left-0 right-0 -bottom-0.5 flex items-center justify-center">
                    <div className="h-[2px] w-full bg-[#3B6533] rounded-full"></div>
                    <div className="absolute w-2 h-2 rotate-45 bg-[#3B6533] -top-[3px]"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Circular Nature Icon */}
        <div className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-[#2A4424] text-[#F5EBDC] shadow-sm hover:scale-105 transition-transform cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden text-[#3B6533] p-1.5 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
