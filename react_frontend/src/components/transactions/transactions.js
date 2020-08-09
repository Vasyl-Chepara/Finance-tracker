import React from "react";
import "./transactions_style.css";
import fetch_data_from_api from "./../../fetchData";
import { GET_DATA_FOR_TRANSACTIONS } from "./../../actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";

function create_item(item) {
  const v_line = ["vl"];
  if (item[2] === "Expenses") {
    v_line.push("vl_out");
  } else if (item[2] === "Savings") {
    v_line.push("vl_income");
  } else if (item[2] === "Invests") {
    v_line.push("vl_invests");
  }
  return (
    <div key={item[3]} className="transaction_item">
      <div className={v_line.join(" ")}></div>
      <div className="transaction_name">{item[0]}</div>
      <div className="transaction_date">{item[1]}</div>
      <div className="transaction_value">{item[3] + " €"}</div>
    </div>
  );
}

class Transactions extends React.Component {
  state = {
    items: [0, 12],
    transactions_data: [],
    hasMore: true,
  };

  constructor(props) {
    super(props);
    fetch_data_from_api(GET_DATA_FOR_TRANSACTIONS, this.state.items);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ transactions_data: this.props.data_transactions });
    }
  }

 
  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    const limits = [this.state.items[0]+12,this.state.items[1]+12]
    this.setState({ items: limits });
    fetch_data_from_api(GET_DATA_FOR_TRANSACTIONS, limits);
    this.setState({items: this.state.items.concat(this.props.data_transactions )});
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
            <InfiniteScroll
              dataLength={this.state.items.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<p style={{ textAlign: "center" }}>
             <b>Loading more items...</b>
            </p>
              }
              height={700}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }>
              {this.state.transactions_data.map((item) => create_item(item))}
            
            </InfiniteScroll>

            {/* {isFetching && 'Fetching more list items...'} */}
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
