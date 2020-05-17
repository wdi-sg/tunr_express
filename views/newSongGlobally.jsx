var React = require("react");
var Layout = require('./components/layout.jsx');

class NewSong extends React.Component {
  render() {
     //let addurl = "/artist/" + {option.value}+ "/songs/new";

     const artistDropdown = this.props.artists.map(artists =>{
        return (
                <option value = {artists.id}>{artists.name}</option>
        )
    });


    return (
      <Layout>
            <h1> Add a new song </h1>
            <form action ="/songs/new" method ="POST">
                <h2>Name</h2>
                <select name = 'artist_id'>
                    {artistDropdown}
                </select>

                <h2>Title</h2>
                <input type="text" name="title" placeholder="Title"/>

                <h2>Album</h2>
                <input type="text" name="album" placeholder="Album"/>

                <h2>Preview Link</h2>
                <input type="text" name="preview_link" placeholder="URL"/>

                <h2>Album Photo</h2>
                <input type="text" name="artwork" placeholder="Album Cover"/>
                <br/><br/>
                <input type="submit"/>
            </form>
        </Layout>
    );
  }
}

module.exports = NewSong;