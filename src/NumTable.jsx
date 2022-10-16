import React from "react";

class NumTable extends React.Component {
    render() {
        const rows = [];
        if (this.props.data != undefined) this.props.data.map((element, index) => {
            rows.push(<tr onClick={() => this.props.remove(index)}><td>{element}</td></tr>);
        }, this);

        return (
            <table class="num-table"> {rows} </table >
        )
    }
}

export default NumTable;