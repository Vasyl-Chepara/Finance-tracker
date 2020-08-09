import React from "react";
import "./dashboard.css";
import Expenseslinegraph from "./graphs/Expenses_line_graph";
import Piechart from "./graphs/Pie_chart";
import { connect } from "react-redux";

import fetch_data_from_api from "./../../fetchData";
import { GET_DATA_FOR_OVEVIEW } from "./../../actions";
// import { store } from "./../../store";



function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function create_item(item) {
  if (typeof(item[2]) == "undefined"){
    item[2] = 'Total: '
    console.log()
  }
  return (
    <div key={item[0] + parseInt(item[1])} className="item">
      <div className="item_name">{item[0]}</div>
    
      <div className="item_value">
         {item[2]+'   ' + round(item[1], 2) + '€'}
      </div>
      <span className="separate"></span>
    </div>
  );
}

class DashBoard extends React.Component {
  state = {
    data: {
      Expenses_by_categories: {},
      Expenses_by_month: {},
      Invests: [],
      Last_expenses: [],
      Savings: {},
    },
  };
  
  constructor(props) {
    super(props);
    fetch_data_from_api(GET_DATA_FOR_OVEVIEW);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({data: this.props.data_overview });
    }
  }

  render() {
    return (
      <div key='0' className="parent-content">
        <p className="name">Overview</p>
        <div className="content">
          <div className="timeseries_graph">
            <p className="label">Timeseries of expenses graph</p>
            <div className="graph_container">
              <Expenseslinegraph data = {this.state.data.Expenses_by_month}/>
            </div>
          </div>

          <div className="pie_chart">
            <p className="label">Expenses by categories</p>
            <div className="pie_container">
              <Piechart data = {this.state.data.Expenses_by_categories}/>
            </div>
          </div>

          <div key='1' className="plate expenses_container">
            <p className="label">Last 7 expenses</p>
            <div className="container">
            {this.state.data.Last_expenses.map(item => (create_item(item)))}
            </div>
          </div>

          <div className="plate invests_container">
            <p className="label">Invests</p>
            <div className="container">
              {Object.entries(this.state.data.Invests).map(item => (create_item(item)))}
              <div className='item'></div>
            </div>
          </div>

          <div className="plate savings_container">
            <p className="label">Savings</p>
            <div className="container">
              <h2>
                Total savings is {round(this.state.data.Savings.Total_savings, 2) + " €"}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    data_overview: store.data_overview,
  };
}

export default connect(mapStateToProps)(DashBoard);
