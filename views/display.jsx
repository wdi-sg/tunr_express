var React = require("react");
var DefaultLayout = require ('./default');

class Home extends React.Component {
    render() {
        let pulled = this.props.list[0];
        console.log("inside react pulled id:", pulled.id);
        const actionPath = '/artist/' + pulled.id + '?_method=delete';

        return (
            <DefaultLayout>
            <div>
            <h1> The id of this artist : {pulled.id} </h1>
            <h1> Name of Artist: {pulled.name}</h1>
            <img src = {pulled.photo_url} alt = "Photo not found"/>
            <h1> Nationality of Artist : {pulled.nationality}</h1>

            <a href = {'/artist/'+ pulled.id +'/edit'} className="btn btn-primary btn-md btn-primary my-3 active" role="button" aria-pressed="true">
                Edit this Artist</a>
                 <form method="POST" action={actionPath}>
                            <input name="del-recipe" type="hidden"/>
                                <button type="submit" value = "delete this" className = "btn btn-danger btn-md active my-3" > Delete this Artist </button>

                        </form>
                        </div>
                        </DefaultLayout>
        );
    }
}


module.exports = Home;