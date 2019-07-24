const React = require("react");
const DefaultLayout = require('./layouts/default');


class AllSongs extends React.Component {
  render() {

    let headerTitle = 'Songs | Tunr'
    let songsURL = `/songs/new`
    let buttonStyle = {'fontSize': '25px'}


    return (

      <DefaultLayout title={headerTitle}>

        <div>
            Songs...
            <form action={songsURL}>
            <button style={buttonStyle} type={"submit"}>NEW SONG</button>
            </form>
        </div>

      </DefaultLayout>
    );

  }
}

module.exports = AllSongs;