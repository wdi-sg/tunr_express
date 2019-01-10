var React = require("react");


class Home extends React.Component {
    render() {
        let pulled = this.props.list[0];
        console.log("inside react pulled id:", pulled.id);
        const actionPath = '/artist/' + pulled.id + '?_method=delete';

        return (
            <div>
            <h1> The Id of this artist is {pulled.id} </h1>
            <h1> His name is {pulled.name}</h1>
            <img src = {pulled.photo_url} alt = "Photo not found"/>
            <h1> His nationality is {pulled.nationality}</h1>


            <form method="POST" action={actionPath}>
                            <input name="del-recipe" type="hidden"/>
                                <button type="submit" value = "delete this"> Delete this Artist </button>
                        </form>
                        </div>
        );
    }
}


module.exports = Home;