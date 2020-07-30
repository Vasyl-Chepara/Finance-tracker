import React from "react";
import { Doughnut } from "react-chartjs-2";

var options = {
  legend: {
    labels: {
      fontColor: "rgb(219, 219, 219)",
      fontSize: 15,
    },
  },
  maintainAspectRatio: false,
};

class Piechart extends React.Component {
  state = {
    labels: [],
    datasets: [
      {
        fontColor: "#ffffff",
        label: "Expenses",
        backgroundColor: [
          "#8445D5",
          "#ED422E",
          "#EA377C",
          "#24ED8C",
          "#EDD225",
        ],
        hoverBackgroundColor: [
          "#8445D5",
          "#ED422E",
          "#EA377C",
          "#24ED8C",
          "#EDD225",
        ],
        data: [],
      },
    ],
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      let chartData = this.state;
      chartData.labels = Object.keys(this.props.data);
      chartData.datasets[0].data = Object.values(this.props.data);
      this.setState({ chartData });
    }
  }
  render() {
    return <Doughnut data={this.state} options={options} />;
  }
}

export default Piechart;
