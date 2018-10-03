var React = require("react");
var DefaultLayout = require('./layout/default')


class New extends React.Component {
  render() {

     let artistname = this.props.artists[0].name;
    let artistimg = this.props.artists[0].photo_url;
    let artistnationality = this.props.artists[0].nationality;
    let actionURL = '/artist/'+this.props.artists[0].id+'?_method=PUT';

    let deleteURL = '/artist/'+this.props.artists[0].id+'?_method=DELETE';


<h3>EDIT</h3>

        <form method = 'POST' action = {actionURL} >
        <input type = 'text' name= 'name' value={artistname}/>
        <input type = 'text' name= 'photo_url' value={artistimg}/>
        <input type = 'text' name= 'nationality' value={artistnationality}/>
        <input type = 'submit' value= 'submit' class='submit'/>

          <form method = "POST" action ={deleteURL}><input type="submit" value='Delete' class="submit"/></form>

s

    </DefaultLayout>
    );
  }
}

    module.exports = Edit;




