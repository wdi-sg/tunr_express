var React = require("react");
var DefaultLayout = require ('./default');


class Edit extends React.Component {
    render() {
        let pulled = this.props.list;
        console.log(pulled);

        return (
            <DefaultLayout>
            <div>
            <h1> Artist Id: {pulled.id} is Successfully updated! </h1>
            <h2> Name is updated to : {pulled.name}</h2>
            <h2> Photo is updated to: </h2><br></br>
            <img src = {pulled.photo_url} alt = "Photo not found"/>
            <h2> Nationality is updated to : {pulled.nationality}</h2>
            </div>
            </DefaultLayout>
        );
    }
}


module.exports = Edit;