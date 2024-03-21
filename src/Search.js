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
      list: [],
    };
    this.addList = this.addList.bind(this);
  }

  // ここやってます
  // stateのlist配列にボタンイベントのvalue(eur)追加成功、これをどうやってHomeに移すか？
  // ボタンクリックイベントの判定ゆるい？
  addList = (event)=> {
    let lists = this.state.list;
    let language = event.target.value;

    if (lists.indexOf(language) === -1) {
      this.setState({ list: [...lists, language] });
      console.log(lists);
    } else {
      return ;
    };
  }

  render() {
    return (
      <div>
        <NavbarSearch />
        <ul className='container my-4'>
          <li className='row my-2'>
            <input type='checkbox' value='eur' className='checkbox col-1'></input>
            <img className='col-2 flag' src='./images/eur.png' alt='euro'></img>
            <div className='col-8 currency-name'>
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