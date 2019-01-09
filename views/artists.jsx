var React = require("react");
var DefaultLayout = require('./layouts/default');

class Artists extends React.Component {
  render() {

    const artists = this.props[0].map( (artist) => {
            return (
                <div style={{marginTop: '50px'}}>
                    <a href={`http://localhost:3000/${artist.name}`}><h1>{artist.name}</h1></a>
                </div>
            );
    });

    return (
        <DefaultLayout>
            {artists}
        </DefaultLayout>
    );
  }
}

module.exports = Artists;
