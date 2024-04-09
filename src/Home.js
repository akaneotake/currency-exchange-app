import React from 'react';
import { Link } from 'react-router-dom';
import { Currency } from './CurrencyLists';

import { IconContext } from 'react-icons';
import { FaPlus, FaBalanceScale } from 'react-icons/fa';

const NavbarHome= ()=> {
  return (
    <nav className='navbar navbar-home border-bottom shadow-sm'>
      <div className="container-fluid">
        <Link to='/' className='navbar-brand mx-auto'>
          <h5 className='mb-0 space-mono-bold-italic'><FaBalanceScale /> HOW MUCH in...</h5>
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
    };
  };

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
  };

  render() {
    const { date }= this.state;

    return (      
      <div id='home'>
        <NavbarHome />
        <div className='container'>
          <h6 className='text-center my-2'>
            Latest Update: { date }
          </h6>
          <ul className='my-4 p-0'>
            <Currency />
          </ul>
        </div>
     </div>
    );
  };
};

// ドラッグ＆ドロップでリスト並び替え
