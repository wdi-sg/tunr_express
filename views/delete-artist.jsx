var React = require("react");
var DefaultLayout = require ('./default');

class Delete extends React.Component {
    render() {
        let pulled = this.props.list;
        console.log(pulled);

        return (
            <DefaultLayout>
            <div>
            <h2> Artist : {pulled.name} is successfully deleted!</h2>

            </div>
            </DefaultLayout>
        );
    }
}


module.exports = Delete;