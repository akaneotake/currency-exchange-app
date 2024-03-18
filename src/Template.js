import { IconContext } from 'react-icons';
import { FaPlus } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg border-bottom shadow-sm">
      <a className="navbar-brand mx-auto" href='#'>
        <h2 className='mb-0'><FaBalanceScale /> HOW MUCH in...</h2>
      </a>
      <IconContext.Provider value={{ size: '20px' }}>
        <button className="btn me-2" href='#'>
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