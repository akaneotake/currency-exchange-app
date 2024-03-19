import React from 'react';

import { FaPlus } from 'react-icons/fa';

class Search extends React.Component {
  constructor(props) {
    super(props);
    // false = not in the list
    // true = in the list already
    this.state = {
      eur: false,
    };
    this.addList = this.addList.bind(this);
  }

  // ここやってます
  // ボタンクリックイベントの判定ゆるい？
  addList = (event)=> {
    this.setState({ [event.target.value]: true });
    console.log(this.state.eur);
  }

  componentDidUpdate(){
    console.log(this.state.eur)
  }

  render() {
    return (
      <ul className='container my-4'>
        <li className='row my-2'>
          <img className='col-2 flag' src='./images/eur.png' alt='euro'></img>
          <div className='col-9 currency-name'>
            <p className='fw-bold'>EUR</p>
            <p>Euro</p>
          </div>
          <button className='col-1 py-auto' value='eur' onClick={ this.addList }><FaPlus /></button>
        </li>







    </ul>  

    );
  }
}

export default Search;