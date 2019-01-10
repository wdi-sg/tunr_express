var React = require ('React');
var DefaultLayout = require ('./default');

class EditArtist extends  React.Component {
    render(){
        console.log(this.props.list[0].id);
        const actionPath = '/artist/' + this.props.list[0].id + '?_method=PUT';

        // console.log(this.props.list[0]);
       return(
        <DefaultLayout>
        <div>
        <h1>You are editing the artist {this.props.list[0].name}</h1>
        <form action = {actionPath} method = "POST">
        <h3> New Name : </h3>
        <input name = "name"></input>
        <h3> New Photo Url : </h3>
        <input name = "photo_url"></input>
        <h3> New Nationality : </h3>
        <input name = "nationality"></input> <br></br>
        <button type = "submit">  Edit Artist </button>
        </form>
        </div>
        </DefaultLayout>
        )
        // const editRecipe = this.props.edit;
        // const actionPath = `/recipes/${editRecipe.num}?_method=PUT`;

    }
}

module.exports = EditArtist;