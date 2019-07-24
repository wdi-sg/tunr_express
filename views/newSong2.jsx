const React = require('react');
const DefaultLayout = require('./layouts/default');
const SelectBlock = require('./components/selectBlock');


class New extends React.Component {
  render() {

    let headerTitle = "New Song | Tunr";

    let artists = this.props.artists;

    let songURL = `/songs`;

    return (

      <DefaultLayout title={headerTitle}>

        <h1>Create New Song</h1>

        <form method="POST" action={songURL}>
            <p>Title:</p>
            <input type={"text"} name={"title"} required/>
            <p>Album:</p>
            <input type={"text"} name={"album"} required/>
            <p>Preview Link:</p>
            <input type={"text"} name={"preview_link"} required/>
            <br/>
            <br/>
            <p>Artist:</p>
            <SelectBlock artists={artists}/>
            <br/>
            <br/>
            <input type="submit" value="CREATE SONG"/>
        </form>

      </DefaultLayout>
    );
  }
}

module.exports = New;