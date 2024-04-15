import React from 'react';
import { Link } from 'react-router-dom';
import { Currencies } from './CurrencyInfo';

import { GoTriangleDown } from "react-icons/go";
import { IoReorderTwoOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";

// Grobal variable to store the checked list & use them in Currency, ChooseCurrency and Search classes.
let listToHome= ['EUR', 'USD', 'JPY'];

// Insert the list of currency in Home page
export class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      base: '',
      amount: '',
      retes: [],
    };
  };

  componentDidMount() {
    this.toChart(this.state.base);
  }

  toChart= (base)=> {
    const chart= document.querySelectorAll('.to-historical-rate');

    chart.forEach(i=> {
      if (!base) {
        i.classList.add('d-none');
      } else if (base == i.getAttribute('name')) {
        i.classList.add('d-none');
      } else {
        i.classList.remove('d-none');
      }
    });
  }

  getBase= (event)=> {
    this.setState({
      base: event.target.name,
      amount: '',
    });
  }

  getRates= ()=> {
    const { base }= this.state;
    this.toChart(base);
   
    fetch(`https://api.frankfurter.app/latest?from=${ base }`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      const rates= Object.keys(data.rates)
      .filter(i=> i !== base)
      .map(i=> ({
        [i]: data.rates[i],
      }))
      this.setState({ rates });
    }).catch(error => console.log('Error!: ', error))
  };

  getAmount= (event)=> {
    this.setState({
      amount: event.target.value,
    })
  };

  getValue= (name)=> {
    const { base, amount, rates }= this.state;

    if (!amount) {
      return '';
    } else if (base === name) {
      return amount;
    } else {
      const rate= Object.values(rates.find(i=> i[name]));
      return (rate * amount).toFixed(2);
    };
  };

  handleSubmit= (event)=> {
    event.preventDefault();
  };

  // Trush bin function
  deleteCurrency= (event)=> {
    const name= event.currentTarget.name;
    const element= document.querySelector(`#${name}`);

    element.classList.add('d-none');        
    listToHome= listToHome.filter((item) => (item !== name));
  };

  // Drag and Drop function
  // リスト一番下の要素をすぐ上に移動できないのはなぜ？
  handleDragStart= (event)=> {
    event.dataTransfer.setData('text', event.currentTarget.id);
    event.currentTarget.classList.add('dragging');
    event.currentTarget.classList.remove('slideIn');
  };

  handleDragEnter= (event)=> {
    event.currentTarget.classList.add('drop-zone');
    event.currentTarget.classList.add('pointer-event');
  };

  handleDragOver= (event)=> {
    event.preventDefault();
  };

  handleDragLeave= (event)=> {
    event.currentTarget.classList.remove('drop-zone');
  };

  handleDragEnd= (event)=> {
    event.currentTarget.classList.add('slide-in');

    const li = [...document.querySelectorAll(".currency-home")];
    li.forEach((i)=> {
      i.classList.remove('drop-zone');
      i.classList.remove('dragging');
      i.classList.remove('pointer-event');
    });
  }

  handleDrop= (event)=> {
    event.preventDefault();
    const li = [...document.querySelectorAll('.currency-home')];

    if (li.indexOf(event.currentTarget) === 0) {
        event.currentTarget.before(document.getElementById(event.dataTransfer.getData('text')));
    } else {
        event.currentTarget.after(document.getElementById(event.dataTransfer.getData('text')));
    };
  };

  render() {  
    const { base }= this.state;

    return Currencies.map(({ name, longName, image })=> {
      // Unshown the currency which is not chosen in Search page
      const display= listToHome.includes(name)? '' : 'd-none';
      const classes= `currency-home row my-1 px-2 mx-lg-5 ${display}`;

      return( 
        <li id={ name } key={ name } className={ classes } onDragStart={ this.handleDragStart } onDragEnter={ this.handleDragEnter } onDragOver={ this.handleDragOver } onDragLeave={ this.handleDragLeave } onDragEnd={this.handleDragEnd} onDrop={ this.handleDrop }>
          <img className='col-2 flag p-0' src={ image } alt={ longName } draggable='false'></img>
          <div className='col-2 my-auto p-0 text-center'>
            <span className='short-name'>{ name }</span>
            <Link to='/search'><GoTriangleDown /></Link>
          </div>
          <form className='col-5 p-0' autoComplete="off" onSubmit={ this.handleSubmit }>
            <input className='h-100 w-100 text-end border-0 input-home no-spin' type='number' step='1' name={ name } value={ this.getValue(name) } onFocus={ this.getBase } onClick={ this.getRates } onInput={ this.getAmount }></input>
          </form>
          <Link to={`/historical-rate?base=${base}&quote=${name}`} className='col-1 mt-1'><span className='to-historical-rate' name={ name }><BsGraphUpArrow /></span></Link>
          <button type='button' className='btn col-1 m-auto dnd' draggable='true'><IoReorderTwoOutline /></button>
          <button type='button' name={ name } className='btn col-1' onClick={ this.deleteCurrency }><FaRegTrashAlt /></button>
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
        <li className='currency-search row my-2 mx-lg-5' key={ name } data-short={ name } data-long={ longName }>
          <input className='checkbox col-2' type='checkbox' defaultChecked={ checked } name={ name } onClick={ this.handleClick }></input>
          <img className='col-2 flag' src={ image } alt={ longName }></img>
          <div className='col-8 currency-name'>
            <p className='short-name'>{ name }</p>
            <p className='long-name'>{ longName }</p>
          </div>
        </li>
      );
    });
  };
}; 