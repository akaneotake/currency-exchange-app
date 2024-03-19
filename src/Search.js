import React from 'react';

import { FaPlus } from 'react-icons/fa';

class Search extends React.Component {
  render() {
    return (
      <ul className='container my-4'>
        <li className='row my-2'>
          <img className='col-2 flag' src='./images/eur.png' alt='euro'></img>
          <div className='col-9 currency-name'>
            <p className='fw-bold'>EUR</p>
            <p>Euro</p>
          </div>
          <div className='col-1 my-auto'><FaPlus /></div>
        </li>

        <li className='row my-2'>
          <img className='col-2 flag' src='./images/eur.png' alt='euro'></img>
          <div className='col-9 currency-name'>
            <p className='fw-bold'>EUR</p>
            <p>Euro</p>
          </div>
          <div className='col-1 my-auto'><FaPlus /></div>
        </li>



    </ul>  

    )
  }
}

export default Search;