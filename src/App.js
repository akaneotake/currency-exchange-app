import React from 'react';
// Routerいる？
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Template from './Template';

import { GoTriangleDown } from "react-icons/go";
import { IoReorderTwoOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";


import './App.css';

function App() {
  return (
    <Template>
      <div className='px-0'>
        <h6 className='text-center py-2'>
          Latest Update: <span></span>
        </h6>

        <ul className='container'>
          <li className='row currency my-2'>
            <img className='col-2 flag' src='./images/eur.png' alt='euro'></img>
            <span className='col-2 currency-name'>EUR<GoTriangleDown /></span>
            <input className='col-6' type='text' name='amount-of-money'></input>
            <span className='col-1'><IoReorderTwoOutline /></span>
            <span className='col-1'><FaRegTrashAlt /></span>
          </li>

          <li className='row currency my-2'>
            <img className='col-2 flag' src='./images/eur.png' alt='euro'></img>
            <span className='col-2 currency-name'>EUR<GoTriangleDown /></span>
            <input className='col-6' type='text' name='amount-of-money'></input>
            <span className='col-1'><IoReorderTwoOutline /></span>
            <span className='col-1'><FaRegTrashAlt /></span>
          </li>



        </ul>  

      </div>
    </Template>
  );
};

export default App;
