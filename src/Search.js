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

// Grobal variable to store the checked list & use them in Currency, ChooseCurrency and Search classes.
let listToHome= ['EUR', 'USD', 'JPY']; 

// Insert the list of currency in Home directory
export class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: listToHome,
    }
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLoad= ()=> {
    const shortName= this.props.shortName;
    const { checkedList }= this.state;
    const element= document.getElementById(shortName);

    if (checkedList.indexOf(shortName) === -1) {
      element.className= 'd-none';
    } else {
      element.classList.remove= 'd-none';
    };
  };

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
  };
};

class ChooseCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      checkedList: listToHome,
    };
    this.handleLoad = this.handleLoad.bind(this);
  };

  // ここにチェックマークの情報を保持するコード書く
  handleLoad= ()=> {
    const { checkedList }= this.state;
    const shortName= this.props.shortName;
    const element= document.getElementById(shortName);

    if (checkedList.indexOf(shortName) == -1) {
      element.checked= false;
    } else {
      element.checked= true;
    };
  };

  render() {
    const { shortName, longName, src, click }= this.props;

    return(
      <li className='row my-2' onLoad={ this.handleLoad }>
        <input id={ shortName } className='checkbox col-1' type='checkbox' name={ shortName } onClick={ click }></input>
        <img className='col-2 flag' src={ src } alt={ longName }></img>
        <div className='col-9 currency-name'>
          <p className='short-name'>{ shortName }</p>
          <p>{ longName }</p>
        </div>
      </li>
    );
  };
};

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: listToHome,
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick = (event)=> {
    const { checkedList }= this.state;
    const language = event.target.name;
    
    if (checkedList.indexOf(language) === -1) {
      this.setState({
        checkedList: [...checkedList, language],
      });
    } else {
      this.setState({
        checkedList: checkedList.filter((item) => (item != language)),
      });
    };
  };

  render() {
    listToHome= this.state.checkedList;
    console.log(this.state.checkedList);
    
    return (
      <div>
        <NavbarSearch />
        <ul className='container my-4'>

          <ChooseCurrency shortName='EUR' longName='Euro' src='./images/eur.png' click={ this.handleClick } />

          <ChooseCurrency shortName='USD' longName='United States Dollar' src='./images/usd.png' click={ this.handleClick } />

          <ChooseCurrency shortName='JPY' longName='Japanese Yen' src='./images/jpy.png' click={ this.handleClick } />

        </ul>  
      </div>
    );
  };
};