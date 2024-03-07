const Navbar = () => {
  return (
    <nav className="navbar">
      <a className="navbar-brand href='#'">$HOW MUCH in...</a>
    </nav>
  );
};

const Footer = () => {
  return (
    <div className="border-top p-2">
      Build by Akane Otake
    </div>
  );
};

const Template = (props) => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            {props.children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Template;