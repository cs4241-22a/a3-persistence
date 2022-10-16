import React from "./_snowpack/pkg/react.js";
class NumTable extends React.Component {
  render() {
    const rows = [];
    if (this.props.data != void 0)
      this.props.data.map((element, index) => {
        rows.push(/* @__PURE__ */ React.createElement("tr", {
          onClick: () => this.props.remove(index)
        }, /* @__PURE__ */ React.createElement("td", null, element)));
      }, this);
    return /* @__PURE__ */ React.createElement("table", {
      class: "num-table"
    }, " ", rows, " ");
  }
}
export default NumTable;
