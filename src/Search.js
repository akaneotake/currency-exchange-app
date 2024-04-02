import React from 'react';
import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { FaArrowLeft } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { IoReorderTwoOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

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

let listToHome= ['EUR', 'USD', 'JPY']; 

export class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: listToHome,
    }

    this.handleLoad = this.handleLoad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLoad= ()=> {
    const shortName= this.props.shortName;
    const { list }= this.state;
    const element= document.getElementById(shortName);

    // ここうまく機能してる？
    if (list.indexOf(shortName) === -1) {
      element.className= 'd-none';
    } else {
      element.classList.remove= 'd-none';
    }
  }

  handleSubmit= (event)=> {
    event.preventDefault();
  };

  render() {    
    const { shortName, longName, src, amount, rate, click, input }= this.props;
    const value= amount * rate;

    return (
      <li id={ shortName } className='row my-1 px-2' onLoad={ this.handleLoad }>
        <img className='col-2 flag p-0' src={ src } alt={ longName }></img>
        <div className='col-2 my-auto p-0 text-center'>
          <span className='short-name'>{ shortName }</span>
          <Link to='/search'><GoTriangleDown /></Link>
        </div>
        <form className='col-6 p-0' autoComplete="off" onSubmit={ this.handleSubmit }>
          <input className='input h-100 w-100 text-end border-0' type='number' step='1' name={ shortName } value={ value } onClick={ click } onInput={ input }></input>
        </form>
        <button type='button' className='btn col-1 m-auto'><IoReorderTwoOutline /></button>
        <button type='button' className='btn col-1'><FaRegTrashAlt /></button>
      </li>
    );
  }
}

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: '',
    };

    this.handleLoad = this.handleLoad.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // ここにチェックマークの情報を保持するコード書く
  handleLoad= ()=> {
    console.log('ごりら');
  }

  handleClick = (event)=> {
    const { checkedList }= this.state;
    const language = event.target.value;
    
    if (checkedList.indexOf(language) === -1) {
      this.setState({
        checkedList: [...checkedList, language],
      });
    } else {
      this.setState({
        checkedList: checkedList.filter((item, index) => (item != language)),
      });
    };
  }

  render() {
    listToHome= this.state.checkedList;

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