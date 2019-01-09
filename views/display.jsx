var React = require("react");


class Home extends React.Component {
    render() {
        let pulled = this.props.list[0];

        return (
            <div>
            <h1> The Id of this artist is {pulled.id} </h1>
            <h1> His name is {pulled.name}</h1>
            <img src = {pulled.photo_url} alt = "Photo not found"/>
            <h1> His nationality is {pulled.nationality}</h1>
            </div>
        );
    }
}


module.exports = Home;