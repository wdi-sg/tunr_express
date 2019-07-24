const React = require("react");
const DefaultLayout = require('./layouts/default');
const ArtistBlock = require('./components/artistBlock');


class Artists extends React.Component {
  render() {

    let headerTitle = 'Artists | Tunr'
    let artists = this.props.artists;
    let createURL = `/artists/new`
    let buttonStyle = {'fontSize': '25px'}

    return (

      <DefaultLayout title={headerTitle}>

        <h1>Artists</h1>

        <form action={createURL}>
            <button style={buttonStyle} type={"submit"}>CREATE ARTIST</button>
        </form>

        <ArtistBlock artists={artists}/>



      </DefaultLayout>
    );

  }
}

module.exports = Artists;