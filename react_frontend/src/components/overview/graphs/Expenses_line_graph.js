import React from "react";
import { Line } from "react-chartjs-2";



var options = {
  legend: {
    labels: {
      fontColor: "rgb(219, 219, 219)",
      fontSize: 15,
    },
  },
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        stacked: true,
        gridLines: {
          display: true,
          color: "#595959",
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};


class Expenseslinegraph extends React.Component {
  state = {
    labels: [],
    datasets: [
      {
        label: "Expenses",
        fill: true,
        lineTension: 0.0,
        backgroundColor: "#378267",
        borderColor: "#40A781",
        borderCapStyle: "round",
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#51D5A5",
        pointHoverRadius: 5,
        pointHoverBorderWidth: 7,
        pointRadius: 5,
        data: [],
      },
    ],
  };

  componentDidUpdate(prevProps) {
    
    if (this.props !== prevProps) {
      const values = []
      const dates = []
      const sorted = Object.entries(this.props.data).sort((a, b) => new Date(b[0]) - new Date(a[0])).reverse()
      for (var i of sorted) {
        dates.push(i[0]);
        values.push(i[1]);
      }
      let chartData = this.state;
      chartData.labels = dates
      chartData.datasets[0].data = values
      this.setState({ chartData });
    }
  }

  render() {
    return <Line data={this.state} options={options} />;
  }
}

export default Expenseslinegraph;
