const React = require('react');
const DefaultLayout = require('./layouts/default');
const SelectBlock = require('./components/selectBlock');


class New extends React.Component {
  render() {

    let headerTitle = "New Artist | Tunr";

    let songs = this.props.songs;
    let artists = this.props.artists;
    let id = this.props.id;

    let songURL = `/artists/${id}/songs`;

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
            <input type="submit" value="CREATE SONG"/>
        </form>

      </DefaultLayout>
    );
  }
}

module.exports = New;