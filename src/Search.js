import React from 'react';
import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { FaArrowLeft } from "react-icons/fa";

const NavbarSearch = () => {
  return (
    <nav className='navbar border-bottom shadow-sm'>
      <div className="container-fluid">
        <IconContext.Provider value={{ size: '20px' }} className='col-2'>
          <Link to='/'>
            <button className='btn'><FaArrowLeft /></button>
          </Link> 
        </IconContext.Provider> 
        <div className='col-10'>     
          <input type='search' placeholder='Search Currency' aria-label='Search' className='form-control border-0'></input>
        </div>
      </div>
    </nav>
  );
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  // ここやってます
  // stateのlist配列にボタンイベントのvalue(eur)追加成功、これをどうやってHomeに移すか？
  handleClick = (event)=> {
    const { lists }= this.state;
    const language = event.target.value;
    
    if (lists.indexOf(language) === -1) {
      this.setState({
        lists: [...lists, language],
      });
    } else {
      this.setState({
        lists: lists.filter((item, index) => (item != language)),
      });
    };
  }

  render() {
    // ↓　後で消す　↓
    console.log(this.state.lists);

    return (
      <div>
        <NavbarSearch />
        <ul className='container my-4'>
          <li className='row my-2'>
            <input className='checkbox col-1' type='checkbox' value='EUR' onClick={ this.handleClick }></input>
            <img className='col-2 flag' src='./images/eur.png' alt='Euro'></img>
            <div className='col-9 currency-name'>
              <p className='short-name'>EUR</p>
              <p>Euro</p>
            </div>
          </li>

          <li className='row my-2'>
            <input className='checkbox col-1' type='checkbox' value='USD' onClick={ this.handleClick }></input>
            <img className='col-2 flag' src='./images/usd.png' alt='United States Dollar'></img>
            <div className='col-9 currency-name'>
              <p className='short-name'>USD</p>
              <p>United States Dollar</p>
            </div>
          </li>

        </ul>  
      </div>
    );
  }
}

export default Search;