import React from 'react';
import { Link } from 'react-router-dom';
import { Currency } from './Search';

import { IconContext } from 'react-icons';
import { FaPlus, FaBalanceScale } from 'react-icons/fa';

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
   
// 最初に表示される0なくしたい→amount: undefinedだとなるけどこれで大丈夫？？
export default class Home extends React.Component {
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
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    fetch('https://api.frankfurter.app/latest')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      this.setState({
        date: data.date,
      });
    }).catch(error => console.log('Error!: ', error))
  }

  handleClick= (event)=> {
    this.setState({
      base: event.target.name,
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
    });
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
        // ここダブルだけど大丈夫そ？？
        [base]: 1,
      });
    }).catch(error => console.log('Error!: ', error))
  };

  render() {
    const { date, amount, AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HUF, IDR, ILS, INR, ISK, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PLN, RON, RUB, SEK, SGD, THB, TRY, USD, ZAR }= this.state;

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