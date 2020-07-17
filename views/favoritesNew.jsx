const React = require('react');
const DefaultLayout = require('./layouts/default');
const SelectBlock = require('./components/selectBlock2');


class Favorites extends React.Component {
  render() {

    let headerTitle = "Favorites | Tunr";
    let songs = this.props.songs;

    // let songs = this.props.songs;
    // let artists = this.props.artists;
    // let id = this.props.id;

    // let songURL = `/artists/${id}/songs`;

    return (

      <DefaultLayout title={headerTitle}>

        <h1>Choose Favorite Songs</h1>
        <form method="POST" action={'/favorites'}>

            <SelectBlock songs={songs}/>
            <br/>
            <br/>
            <SelectBlock songs={songs}/>
            <br/>
            <br/>
            <SelectBlock songs={songs}/>
            <br/>
            <br/>
            <input type="submit" value="CONFIRM"/>
        </form>

      </DefaultLayout>
    );
  }
}

module.exports = Favorites;