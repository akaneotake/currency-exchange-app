import React from 'react';
import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { FaArrowLeft } from "react-icons/fa";
import { FaPlus } from 'react-icons/fa';

const NavbarSearch = () => {
  return (
    <nav className='navbar navbar-expand-lg border-bottom shadow-sm'>
      <IconContext.Provider value={{ size: '20px' }} className='col-2'>
        <Link to='/' className='btn ms-2'><FaArrowLeft /></Link> 
      </IconContext.Provider>      
      <div className='col-10'>
        <input type='text' name='search' placeholder='Search Currency' className='border-0'></input>
      </div>
    </nav>
  );
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    // false = not in the list
    // true = in the list already
    this.state = {
      eur: false,
    };
    this.addList = this.addList.bind(this);
  }

  // ここやってます
  // ボタンクリックイベントの判定ゆるい？
  addList = (event)=> {
    this.setState({ [event.target.value]: true });
    console.log(this.state.eur);
  }

  componentDidUpdate(){
    console.log(this.state.eur)
  }

  render() {
    return (
      <div>
        <NavbarSearch />
        <ul className='container my-4'>
          <li className='row my-2'>
            <img className='col-2 flag' src='./images/eur.png' alt='euro'></img>
            <div className='col-9 currency-name'>
              <p className='short-name'>EUR</p>
              <p>Euro</p>
            </div>
            <button className='col-1 py-auto' value='eur' onClick={ this.addList }><FaPlus /></button>
          </li>

        </ul>  
      </div>
    );
  }
}

export default Search;