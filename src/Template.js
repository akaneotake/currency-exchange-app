import { IconContext } from 'react-icons';
import { FaPlus } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand href='#' mx-auto"><FaBalanceScale /> HOW MUCH in...</a>
      <IconContext.Provider value={{ size: '20px' }}>
        <button class="btn my-2 my-sm-0" href='#'>
          <FaPlus />
        </button>
      </IconContext.Provider>
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