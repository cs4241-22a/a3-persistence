import React from "./_snowpack/pkg/react.js";
import NumTable from "./NumTable.js";
import "./style.css.proxy.js";
class App extends React.Component {
  update() {
    let trueThis = this;
    fetch("/update", {
      method: "GET"
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      trueThis.setState({appdata: data});
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
    if (num == "")
      return;
    const json = {
      num
    };
    const body = JSON.stringify(json);
    document.getElementById("num").value = "";
    fetch("/add", {
      method: "POST",
      body,
      headers: {"Content-Type": "application/json"}
    }).then(function(response) {
      const checkPromise = () => {
        response.json().then((result) => {
          trueThis.setState({appdata: result});
        });
      };
      checkPromise();
    });
    return false;
  }
  remove(index) {
    let trueThis = this;
    const json = {
      index
    };
    const body = JSON.stringify(json);
    fetch("/remove", {
      method: "POST",
      body,
      headers: {"Content-Type": "application/json"}
    }).then(function(response) {
      const checkPromise = () => {
        response.json().then((result) => {
          trueThis.setState({appdata: result});
        });
      };
      checkPromise();
    });
    return false;
  }
  render() {
    const {name} = this.props;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("label", {
      for: "num"
    }, "Number:"), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      id: "num",
      name: "num_input"
    }), /* @__PURE__ */ React.createElement("span", {
      id: "error"
    })), /* @__PURE__ */ React.createElement("li", {
      class: "button"
    }, /* @__PURE__ */ React.createElement("button", {
      type: "button",
      id: "submit",
      onClick: this.submit
    }, "Add to List")))), /* @__PURE__ */ React.createElement("table", {
      class: "stat-table"
    }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Count"), /* @__PURE__ */ React.createElement("th", null, "Mean"), /* @__PURE__ */ React.createElement("th", null, "Median"), /* @__PURE__ */ React.createElement("th", null, "Mode")), /* @__PURE__ */ React.createElement("tr", {
      id: "stat-list"
    }, /* @__PURE__ */ React.createElement("th", null, this.state.appdata.stats.entries), /* @__PURE__ */ React.createElement("th", null, this.state.appdata.stats.mean), /* @__PURE__ */ React.createElement("th", null, this.state.appdata.stats.median), /* @__PURE__ */ React.createElement("th", null, this.state.appdata.stats.mode))), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(NumTable, {
      id: "num-list",
      remove: this.remove,
      data: this.state.appdata.data
    }));
  }
  constructor(props) {
    super(props);
    this.state = {
      appdata: {
        stats: {entries: 0, mean: null, median: null, mode: []},
        data: []
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
