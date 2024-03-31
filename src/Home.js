import React from 'react';
import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { FaPlus, FaBalanceScale } from 'react-icons/fa';
import { GoTriangleDown } from "react-icons/go";
import { IoReorderTwoOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

const NavbarHome= ()=> {
  return (
    <nav className='navbar border-bottom shadow-sm'>
      <div className="container-fluid">
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

// componentDidMountでアップデート日時表示させる？？
class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit= (event)=> {
    event.preventDefault();
  }

  render() {    
    const { shortName, longName, src, amount, rate, click, input }= this.props;
    const value= amount * rate;
    console.log(amount, rate);

    return (
      <li className='row my-1 px-2'>
      
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
   
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
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
  }

  // 最初に表示される0なくしたい
  handleClick= (event)=> {
    this.setState({
      base: event.target.name,
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
    });
    // ↓　後で消す　↓
    console.log('Base Language: ', this.state.base);

  }

  // input毎にリクエストはやりすぎか？？
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
      // ↓　後で消す　↓
      console.log('Result: ', data);
      this.setState({
        date: data.date,
        amount: [amount],
        AUD: amount * data.rates.AUD,
        BGN: amount * data.rates.BGN,
        BRL: amount * data.rates.BRL,
        CAD: amount * data.rates.CAD,
        CHF: amount * data.rates.CHF,
        CNY: amount * data.rates.CNY,
        CZK: amount * data.rates.CZK,
        DKK: amount * data.rates.DKK,
        EUR: data.rates.EUR,
        GBP: amount * data.rates.GBP,
        HKD: amount * data.rates.HKD,
        HUF: amount * data.rates.HUF,
        IDR: amount * data.rates.IDR,
        ILS: amount * data.rates.ILS,
        INR: amount * data.rates.INR,
        ISK: amount * data.rates.ISK,
        JPY: data.rates.JPY,
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
        USD: data.rates.USD,
        ZAR: amount * data.rates.ZAR,
        // ここダブルだけど大丈夫そ？？
        [base]: 1,
      });
    }).catch(error => console.log('Error!: ', error))
  };
    
  render() {
    const { date, amount, EUR, USD, JPY }= this.state;

    return (      
      <div>
        <NavbarHome />
        <div className='container'>
          <h6 className='text-center my-2'>
            Latest Update: { date }
          </h6>
          <ul className='my-4 p-0'>

            <Currency shortName='EUR' longName='Euro' src='./images/eur.png' amount={ amount } rate={ EUR } click={ this.handleClick } input={ this.handleInput } />

            <Currency shortName='USD' longName='United States Dollar' src='./images/usd.png' amount={ amount } rate={ USD } click={ this.handleClick } input={ this.handleInput } />

            <Currency shortName='JPY' longName='Japan' src='./images/jpy.png' amount={ amount } rate={ JPY } click={ this.handleClick } input={ this.handleInput } />

          </ul>
        </div>
     </div>
    );
  }
}

export default Home;