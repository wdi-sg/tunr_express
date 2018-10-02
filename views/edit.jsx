var React = require("react");

var DefaultLayout = require('./layout/default');


class Edit extends React.Component {
  render() {
    let artistname = this.props.artists[0].name;
    let artistimg = this.props.artists[0].photo_url;
    let artistnatonality = this.props.artists[0].nationality;
    let actionURL = '/artist/'+this.props.artists[0].id+'?_method=PUT';

    let deleteURL = '/artist/'+this.props.artists[0].id+'?_method=DELETE';


    return (
          <DefaultLayout title="New Task">

          <h3>Edit</h3>

          <form method = 'POST' action = {actionURL} >
          <input type='text' name='name' value={artistname} />
          <input type='text' name='photo_url' value={artistimg}/>
          <input type='text' name='nationality' value={artistnatonality}/>
          <input type='submit' value='Submit' class="submit"/>
          </form>

          <form method = "POST" action ={deleteURL}><input type="submit" value='Delete' class="submit"/></form>

        </DefaultLayout>
    );
  }
}

module.exports = Edit;
