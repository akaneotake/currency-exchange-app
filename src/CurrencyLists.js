import React from 'react';
import { Link } from 'react-router-dom';
import { Currencies } from './CurrencyInfo';

import { GoTriangleDown } from "react-icons/go";
import { IoReorderTwoOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

// Grobal variable to store the checked list & use them in Currency, ChooseCurrency and Search classes.
let listToHome= ['EUR', 'USD', 'JPY'];

// Insert the list of currency in Home page
export class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      base: '',
      amount: undefined,
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
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClickForBin = this.handleClickForBin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleClick= (event)=> {
    this.setState({
      base: event.target.name,
      amount: undefined,
    });
  };

  handleInput= (event)=> {
    const { base }= this.state;
    const amount= event.target.value;

    fetch(`https://api.frankfurter.app/latest?from=${ base }`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      this.setState({
        date: data.date,
        amount: [amount],
        AUD: data.rates.AUD,
        BGN: data.rates.BGN,
        BRL: data.rates.BRL,
        CAD: data.rates.CAD,
        CHF: data.rates.CHF,
        CNY: data.rates.CNY,
        CZK: data.rates.CZK,
        DKK: data.rates.DKK,
        EUR: data.rates.EUR,
        GBP: data.rates.GBP,
        HKD: data.rates.HKD,
        HUF: data.rates.HUF,
        IDR: data.rates.IDR,
        ILS: data.rates.ILS,
        INR: data.rates.INR,
        ISK: data.rates.ISK,
        JPY: data.rates.JPY,
        KRW: data.rates.KRW,
        MXN: data.rates.MXN,
        MYR: data.rates.MYR,
        NOK: data.rates.NOK,
        NZD: data.rates.NZD,
        PHP: data.rates.PHP,
        PLN: data.rates.PLN,
        RON: data.rates.RON,
        RUB: data.rates.RUB,
        SEK: data.rates.SEK,
        SGD: data.rates.SGD,
        THB: data.rates.THB,
        TRY: data.rates.TRY,
        USD: data.rates.USD,
        ZAR: data.rates.ZAR,
        [base]: 1,
      });
    }).catch(error => console.log('Error!: ', error))
  };

  // Trush bin function
  handleClickForBin= (event)=> {
    const name= event.currentTarget.name;
    const element= document.querySelector(`#${name}`);

    element.classList.add('d-none');        
    listToHome= listToHome.filter((item) => (item !== name));
  };

  handleSubmit= (event)=> {
    event.preventDefault();
  };

  render() {  
    const { amount }= this.state;

    return Currencies.map(({ name, longName, image })=> {
      // Unshown the currency which is not chosen in Search page
      const display= listToHome.includes(name)? '' : 'd-none';
      const classes= `currency-home row my-1 px-2 ${display}`;

      return( 
        <li id={ name } key={ name } className={ classes } onLoad={ this.handleLoad }>
          <img className='col-2 flag p-0' src={ image } alt={ longName }></img>
          <div className='col-2 my-auto p-0 text-center'>
            <span className='short-name'>{ name }</span>
            <Link to='/search'><GoTriangleDown /></Link>
          </div>
          <form className='col-6 p-0' autoComplete="off" onSubmit={ this.handleSubmit }>
            <input className='h-100 w-100 text-end border-0 no-spin' type='number' step='1' name={ name } value={ this.state[name] * amount } onClick={ this.handleClick } onInput={ this.handleInput }></input>
          </form>
          <button type='button' className='btn col-1 m-auto'><IoReorderTwoOutline /></button>
          <button type='button' name={ name } className='btn col-1' onClick={ this.handleClickForBin }><FaRegTrashAlt /></button>
        </li>
      );
    });
  };
};

// Insert the list of currency in Search page
export class ChooseCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick= (event)=> {
    const currency = event.target.name;

    if (event.target.checked && !listToHome.includes(currency)) {
      listToHome= [...listToHome, currency];
    } else if (!event.target.checked && listToHome.includes(currency)) {
      listToHome= listToHome.filter((i) => (i !== currency));
    };
  };

  render() {
    return Currencies.map(({ name, longName, image })=> {
      // Check the checkbox
      const checked= listToHome.includes(name)? 'checked' : '';

      return(
        <li className='currency-search row my-2' key={ name } data-short={ name } data-long={ longName }>
          <input className='checkbox col-1' type='checkbox' defaultChecked={ checked } name={ name } onClick={ this.handleClick }></input>
          <img className='col-2 flag' src={ image } alt={ longName }></img>
          <div className='col-9 currency-name'>
            <p className='short-name'>{ name }</p>
            <p className='long-name'>{ longName }</p>
          </div>
        </li>
      );
    });
  };
}; 