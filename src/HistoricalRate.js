import React from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';

import { IconContext } from 'react-icons';
import { FaArrowLeft, FaBalanceScale } from "react-icons/fa";

const NavbarHistoricalRate= ()=> {
  return (
    <nav className='navbar navbar-orange border-bottom shadow-sm'>
      <div className="container-fluid">
        <IconContext.Provider value={{ size: '20px' }}>
          <Link to='/'>
            <button className='btn'><FaArrowLeft /></button>
          </Link> 
        </IconContext.Provider>
        <Link to='/' className='navbar-brand mx-auto'>
          <h5 className='mb-0 site-name'><FaBalanceScale /> HOW MUCH in...</h5>
        </Link>
      </div>
    </nav>
  );
};

export default class HistoricalRate extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(props.location.search);
    this.state = {
      date: '',
      base: params.get('base'),
      quote: params.get('quote'),
    };
    this.chartRef = React.createRef();
  };

  componentDidMount() {
    const { base, quote } = this.state;
    console.log(base, quote);
    this.getHistoricalRates(base, quote);

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

  getHistoricalRates= (base, quote)=> {
    const endDate= new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      const chartLabels = Object.keys(data.rates).map(date => date.slice(5).replace(/^0+/, ''));
      const chartData = Object.values(data.rates).map(rate => rate[quote]);
      const chartLabel = `${base}/${quote}`;
      this.buildChart(chartLabels, chartData, chartLabel);
    }).catch(error => console.log('Error!: ', error))
  };

  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");

    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    });
  };

  render() {
    const { date }= this.state; 

    return (
      <React.Fragment>
        <NavbarHistoricalRate />
        <div className='container'>
          <h6 className='text-center my-2'>
            Latest Update: { date }
          </h6>
          <canvas ref={ this.chartRef } />
        </div>
      </React.Fragment>   
    );
  };
};