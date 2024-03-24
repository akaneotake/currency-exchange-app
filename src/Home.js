import React from 'react';
import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { FaPlus, FaBalanceScale } from 'react-icons/fa';
import { GoTriangleDown } from "react-icons/go";
import { IoReorderTwoOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

const NavbarHome = () => {
  return (
    <nav className='navbar navbar-expand-lg border-bottom shadow-sm'>
      <Link to='/' className='navbar-brand mx-auto'>
        <h2 className='mb-0'><FaBalanceScale /> HOW MUCH in...</h2>
      </Link>
      <IconContext.Provider value={{ size: '20px' }}>
        <Link to='/search' className='btn me-2'><FaPlus /></Link>
      </IconContext.Provider>
    </nav>
  );
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      baseLanguage: '',
    }

    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFocus = (event) => {
    this.setState({ baseLanguage: event.target.name });
  }

  handleChange = () => {
    let { baseLanguage }= this.state;
    fetch(`https://api.frankfurter.app/latest?from=${baseLanguage}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request was either a 404 or 500');
      }).then(data => {
        console.log('Result in JSON: ', data);
        let results = JSON.stringify(data);
        this.setState({results: results});
      }).catch(error => console.log('Error!', error));
  }

  render() {
    return (
      <div>
        <NavbarHome />
        <h6 className='text-center py-2'>
          Latest Update: <span></span>
        </h6>

        <ul className='container my-4 currency-list'>
          <li className='row currency my-2'>
            <img className='col-2 flag' src='./images/eur.png' alt='Euro'></img>
            <div className='col-2 currency-name my-auto'>
            <span className='short-name'>EUR</span>
              <Link to='/search'><GoTriangleDown /></Link>
            </div>
            <input className='col-6 amount' type='number' name='EUR' onFocus={ this.handleFocus } onChange={ this.handleChange }></input>
            <div className='col-1 m-auto move'><IoReorderTwoOutline /></div>
            <button type='button' className='btn col-1 delete'><FaRegTrashAlt /></button>
          </li>

          <li className='row currency my-2'>
            <img className='col-2 flag' src='./images/usd.png' alt='United States Dollar'></img>
            <div className='col-2 currency-name my-auto'>
            <span className='short-name'>USD</span>
              <Link to='/search'><GoTriangleDown /></Link>
            </div>
            <input className='col-6 amount' type='number' name='USD' onFocus={ this.handleFocus } onChange={ this.handleChange }></input>
            <div className='col-1 m-auto move'><IoReorderTwoOutline /></div>
            <button type='button' className='btn col-1 delete'><FaRegTrashAlt /></button>
          </li>
        </ul>
     </div>
    )
  }
}

export default Home;