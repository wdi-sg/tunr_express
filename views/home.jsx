var React = require("react");
var DefaultLayout = require('./layout/default');


class Home extends React.Component {
  render() {

    const artistElements = this.props.artists.map((artist)=>{

        let linkPath = "/artist/"+artist.id;

        return (<li><a href={linkPath}>{artist.name}</a></li>);

    });

    return (
                <DefaultLayout title="New Task">

            <h1>All Artists</h1>
            <ul>
            {artistElements}
            </ul>

            <button><a href="/new">Add new artist page</a></button>

          </DefaultLayout>
    );
  }
}

module.exports = Home;
