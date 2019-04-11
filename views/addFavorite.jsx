var React = require('react');
var DefaultLayout = require('./layouts/default');

class Songs extends React.Component {
  render() {
    let songElements = this.props.songs.map((o) => {
        return <li><label><input type="checkbox" name="songs" value={ o.id }/> { o.title }, { o.album }</label></li>
    });

    return (
        <ul>
            {songElements}
        </ul>
    );
  }
}


class AddFavorite extends React.Component {
  render() {
    return (
        <DefaultLayout title="Add New Favorite">
            <form method="POST" action= "/favorites">
                <h1>Add New Favorite for { this.props.username }</h1>
                Songs: <Songs songs= { this.props.songs }/><br/>
                <input type="hidden" name="username" value= {this.props.username }/>
                <input className="btn btn-primary" type="submit" value="Create Favorite Song List"/>
            </form>
        </DefaultLayout>
    );
  }
}

module.exports = AddFavorite;