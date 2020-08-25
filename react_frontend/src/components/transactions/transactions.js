import React, { Fragment } from "react";
import "./transactions_style.css";
import fetch_data_from_api from "./../../fetchData";
import { GET_DATA_FOR_TRANSACTIONS } from "./../../actions";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";

function create_item(item, index) {
  const v_line = ["vl"];
  if (item[2] === "Expenses") {
    v_line.push("vl_out");
  } else if (item[2] === "Savings") {
    v_line.push("vl_income");
  } else if (item[2] === "Invests") {
    v_line.push("vl_invests");
  }
  
  return (

    <CSSTransitionGroup
      transitionName="item"
      transitionAppear={true}
      transitionAppearTimeout={1500}
      transitionEnterTimeout={1500}
    >
      <li id="transaction" key={index} className="show transaction_item"
      style={{ 'transition-delay': `${index * 100}ms` }}>
        <div className={v_line.join(" ")}></div>
        <div className="transaction_name">{item[0]}</div>
        <div className="transaction_date">{item[1]}</div>
        <div className="transaction_value">{item[3] + " €"}</div>
      </li>
    </CSSTransitionGroup>
  );
}

class Transactions extends React.Component {
  state = {
    limits: [0, 10],
    transactions_data: [],
    hasMore: true,
  };

  constructor(props) {
    super(props);
    fetch_data_from_api(GET_DATA_FOR_TRANSACTIONS, this.state.limits);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ transactions_data: this.props.data_transactions });
    }
  }

  fetchMoreData = () => {
    console.log(this.props.data_transactions.length);
    // if (this.state.transactions_data.length >= 120) {
    // this.setState({ hasMore: false });
    // return;
    // }
    const limits = [this.state.limits[1], this.state.limits[1] + 10];
    // this.setState({ limits: limits });
    fetch_data_from_api(GET_DATA_FOR_TRANSACTIONS, limits);
    this.setState({
      transactions_data: this.state.transactions_data.concat(
        this.props.data_transactions
      ),
      limits: limits,
    });

    // this.setState({ transactions_data: this.props.data_transactions });
  };

  render() {
    return (
      <div className="transactions-parent-content">
        <p className="name">Transactions</p>
        <div className="transactions-content">
          <div className="transactions_container" ref="myscroll">
            <p className="transactions-label">Last transactions</p>
            <button className="button-add" title="Add new item">
              +
            </button>
            <span className="separate"></span>
            <Fragment>
              <ul className="swing">
                {this.state.transactions_data.map((item, index) =>
                  create_item(item, index)
                )}
              </ul>
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    data_transactions: store.data_transactions,
  };
}

export default connect(mapStateToProps)(Transactions);
