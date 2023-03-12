export const Navbar = ({ children }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          ImageFinder
        </a>
        {children}
      </div>
    </nav>
  );
};
