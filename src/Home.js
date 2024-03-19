import React from 'react';

import { IconContext } from 'react-icons';
import { FaPlus, FaBalanceScale } from 'react-icons/fa';
import { GoTriangleDown } from "react-icons/go";
import { IoReorderTwoOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg border-bottom shadow-sm'>
      <a className='navbar-brand mx-auto' href='#'>
        <h2 className='mb-0'><FaBalanceScale /> HOW MUCH in...</h2>
      </a>
      <IconContext.Provider value={{ size: '20px' }}>
        <button className='btn me-2' href='#'>
          <FaPlus />
        </button>
      </IconContext.Provider>
    </nav>
  );
};

class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className='px-0'>
          <h6 className='text-center py-2'>
            Latest Update: <span></span>
          </h6>

          <ul className='container my-4'>
            <li className='row currency my-2'>
              <img className='col-2 flag' src='./images/eur.png' alt='euro'></img>
              <span className='col-2 currency-name'>EUR<GoTriangleDown /></span>
              <input className='col-6' type='text' name='amount-of-money'></input>
              <span className='col-1'><IoReorderTwoOutline /></span>
              <span className='col-1'><FaRegTrashAlt /></span>
            </li>

            <li className='row currency my-2'>
              <img className='col-2 flag' src='./images/eur.png' alt='euro'></img>
              <span className='col-2 currency-name'>EUR<GoTriangleDown /></span>
              <input className='col-6' type='text' name='amount-of-money'></input>
              <span className='col-1'><IoReorderTwoOutline /></span>
              <span className='col-1'><FaRegTrashAlt /></span>
            </li>

          </ul>

        </div>
     </div>
    )
  }
}

export default Home;



