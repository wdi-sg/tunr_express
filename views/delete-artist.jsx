var React = require("react");


class Delete extends React.Component {
    render() {
        let pulled = this.props.list;
        console.log(pulled);

        return (
            <div>
            <h2> Artist : {pulled.name} is successfully deleted!</h2>

            </div>
        );
    }
}


module.exports = Delete;