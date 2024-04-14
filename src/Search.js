import React from 'react';
import { Link } from 'react-router-dom';
import { ChooseCurrency } from './CurrencyLists';

import { IconContext } from 'react-icons';
import { FaArrowLeft } from "react-icons/fa";
import { Currencies } from './CurrencyInfo';

class NavbarSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: [],
    };
  };

  // Get 'index' state from Currencies name & longName
  componentDidMount() {
    const name= Currencies.map(i=>i.name);
    const longName= Currencies.map(i=>i.longName);

    this.setState({
      index: [...name, ...longName],
    });
  };

  // Search Box
  handleChange= (event)=> {
    const value= event.target.value;
    const { index }= this.state;
    const li= document.querySelectorAll('.currency-search');

    // Devide currency 'index' to included and not included the search result  
    let notIncluded= [];
    let included= [];

    index.forEach((item)=> {
      if(value === '') {
        included= index;
      } else if (!item.toLowerCase().includes(value.toLowerCase()) && notIncluded.indexOf(item)=== -1) {
        notIncluded= [...notIncluded, item];  
        included.filter((i) => (i !== item));
      } else if (item.toLowerCase().includes(value.toLowerCase()) && included.indexOf(item)=== -1) {
        included= [...included, item];
        notIncluded.filter((i) => (i !== item));
      };
    });
    
    // Give 'd-none' class to currency list if notIncluded, and remove it if included
    li.forEach((i)=> {
      const short= i.dataset.short;
      const long= i.dataset.long;

      if (included.includes(short) || included.includes(long)) {
        i.classList.remove('d-none');
      } else if (notIncluded.includes(short) || notIncluded.includes(long)) {
        i.classList.add('d-none');
      };
    });
  };

  handleSubmit= (event)=> {
    event.preventDefault();
  };

  render() {
    return (
      <nav className='navbar border-bottom shadow-sm'>
        <div className="container-fluid">
          <IconContext.Provider value={{ size: '20px' }} className='col-2'>
            <Link to='/'>
              <button className='btn'><FaArrowLeft /></button>
            </Link> 
          </IconContext.Provider> 
          <form className='col-10' onSubmit={ this.handleSubmit }>     
            <input type='search' placeholder='Search Currency' aria-label='Search' className='form-control border-0' onChange={ this.handleChange }></input>
          </form>
        </div>
      </nav>
    );
  };
};

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    return (
      <>
        <NavbarSearch />
        <div className='container'>
          <ul className='my-4 p-0'>
            <ChooseCurrency />
          </ul>
        </div>  
      </>
    );
  };
};