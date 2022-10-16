import React from "react";
import NumTable from "./NumTable";
import "./style.css"

class App extends React.Component {

  update() {
    let trueThis = this;
    fetch('/update', {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      trueThis.setState({ appdata: data });
    });
  }

  submit() {
    let trueThis = this;
    const num = document.getElementById("num").value;

    document.getElementById("error").innerHTML = "";

    if (String(num).replace(".", "").length > 10) {
      document.getElementById("error").innerText = "Maximum # of digits is 10";
      return;
    }

    if (num == "") return;

    const json = {
      num: num,
    };

    const body = JSON.stringify(json);
    document.getElementById("num").value = "";

    fetch("/add", {
      method: "POST",
      body,
      headers: { 'Content-Type': 'application/json' },
    }).then(function (response) {
      const checkPromise = () => {
        response.json().then((result) => {
          trueThis.setState({ appdata: result });
        });
      };
      checkPromise();
    });
    return false;
  }

  remove(index) {
    let trueThis = this;
    const json = {
      index: index,
    };

    const body = JSON.stringify(json);

    fetch("/remove", {
      method: "POST",
      body,
      headers: { 'Content-Type': 'application/json' },
    }).then(function (response) {
      const checkPromise = () => {
        response.json().then((result) => {
          trueThis.setState({ appdata: result });
        });
      };
      checkPromise();
    });
    return false;
  }

  render() {
    const { name } = this.props;
    return (
      <>
        <form>
          <ul>
            <li>
              <label for="num">Number:</label>
              <input type="number" id="num" name="num_input" />
              <span id="error"></span>
            </li>
            <li class="button">
              <button type="button" id="submit" onClick={this.submit}>Add to List</button>
            </li>
          </ul>
        </form>

        <table class="stat-table">
          <tr>
            <th>Count</th>
            <th>Mean</th>
            <th>Median</th>
            <th>Mode</th>
          </tr>
          <tr id="stat-list">
            <th>{this.state.appdata.stats.entries}</th>
            <th>{this.state.appdata.stats.mean}</th>
            <th>{this.state.appdata.stats.median}</th>
            <th>{this.state.appdata.stats.mode}</th>
          </tr>
        </table>

        <hr />

        <NumTable id="num-list" remove={this.remove} data={this.state.appdata.data}></NumTable>
      </>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      appdata: {
        stats: { entries: 0, mean: null, median: null, mode: [] },
        data: [],
      }
    };
    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
    this.remove = this.remove.bind(this);
    this.render = this.render.bind(this);
    this.update();
  }
}

export default App;
