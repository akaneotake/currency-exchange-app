import React from 'react';
import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { FaPlus, FaBalanceScale } from 'react-icons/fa';
import { GoTriangleDown } from "react-icons/go";
import { IoReorderTwoOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

const NavbarHome= () => {
  return (
    <nav className='navbar border-bottom shadow-sm'>
      <div class="container-fluid">
        <Link to='/' className='navbar-brand mx-auto'>
          <h5 className='mb-0'><FaBalanceScale /> HOW MUCH in...</h5>
        </Link>
        <IconContext.Provider value={{ size: '20px' }}>
          <Link to='/search'>
            <button className='btn'><FaPlus /></button>
          </Link>
        </IconContext.Provider>
      </div>
    </nav>
  );
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: '',
      amount: '',
      AUD: '',
      BGN: '',
      BRL: '',
      CAD: '',
      CHF: '',
      CNY: '',
      CZK: '',
      DKK: '',
      EUR: '',
      GBP: '',
      HKD: '',
      HUF: '',
      IDR: '',
      ILS: '',
      INR: '',
      ISK: '',
      JPY: '',
      KRW: '',
      MXN: '',
      MYR: '',
      NOK: '',
      NZD: '',
      PHP: '',
      PLN: '',
      RON: '',
      RUB: '',
      SEK: '',
      SGD: '',
      THB: '',
      TRY: '',
      USD: '',
      ZAR: '',
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick= (event)=> {
    this.setState({
      base: event.target.name,
    });
    // ↓　後で消す　↓
    console.log('Base Language: ', this.state.base);
  }

  handleInput= (event)=> {
    const input= event.target.value;

    if (input.match(/[0-9/.]+/g) != input) {
      this.setState({
        amount: '',
      });
    } else {
      this.setState({
        amount: [input],
      })
    };
  }

  handleChange= ()=> {
    const { base }= this.state;
    const { amount }= this.state;

    fetch(`https://api.frankfurter.app/latest?from=${ base }`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request was either a 404 or 500');
      }).then(data => {
        // ↓　後で消す　↓
        console.log('Result: ', data);

        this.setState({
          AUD: amount * data.rates.AUD,
          BGN: amount * data.rates.BGN,
          BRL: amount * data.rates.BRL,
          CAD: amount * data.rates.CAD,
          CHF: amount * data.rates.CHF,
          CNY: amount * data.rates.CNY,
          CZK: amount * data.rates.CZK,
          DKK: amount * data.rates.DKK,
          EUR: amount * data.rates.EUR,
          GBP: amount * data.rates.GBP,
          HKD: amount * data.rates.HKD,
          HUF: amount * data.rates.HUF,
          IDR: amount * data.rates.IDR,
          ILS: amount * data.rates.ILS,
          INR: amount * data.rates.INR,
          ISK: amount * data.rates.ISK,
          JPY: amount * data.rates.JPY,
          KRW: amount * data.rates.KRW,
          MXN: amount * data.rates.MXN,
          MYR: amount * data.rates.MYR,
          NOK: amount * data.rates.NOK,
          NZD: amount * data.rates.NZD,
          PHP: amount * data.rates.PHP,
          PLN: amount * data.rates.PLN,
          RON: amount * data.rates.RON,
          RUB: amount * data.rates.RUB,
          SEK: amount * data.rates.SEK,
          SGD: amount * data.rates.SGD,
          THB: amount * data.rates.THB,
          TRY: amount * data.rates.TRY,
          USD: amount * data.rates.USD,
          ZAR: amount * data.rates.ZAR,
          // ここダブルだけど平気？
          [base]: [amount],
        });
      }).catch(error => console.log('Error!: ', error));
  }

  handleSubmit= (event)=> {
    event.preventDefault();
  }

  render() {
    const { EUR, USD }= this.state;

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
            <form className='col-6 p-0' onSubmit={ this.handleSubmit }>
              <input className='input h-100 w-100' type='text' name='EUR' value={ EUR } onClick={ this.handleClick } onInput={ this.handleInput } onChange={ this.handleChange }></input>
            </form>
            <div className='col-1 m-auto move'><IoReorderTwoOutline /></div>
            <button type='button' className='btn col-1 delete'><FaRegTrashAlt /></button>
          </li>

          <li className='row currency my-2'>
            <img className='col-2 flag' src='./images/usd.png' alt='United States Dollar'></img>
            <div className='col-2 currency-name my-auto'>
            <span className='short-name'>EUR</span>
              <Link to='/search'><GoTriangleDown /></Link>
            </div>
            <form className='col-6 p-0' onSubmit={ this.handleSubmit }>
              <input className='input h-100 w-100' type='text' name='USD' value={ USD } onClick={ this.handleClick } onInput={ this.handleInput } onChange={ this.handleChange }></input>
            </form>
            <div className='col-1 m-auto move'><IoReorderTwoOutline /></div>
            <button type='button' className='btn col-1 delete'><FaRegTrashAlt /></button>
          </li>
        </ul>
     </div>
    )
  }
}

export default Home;