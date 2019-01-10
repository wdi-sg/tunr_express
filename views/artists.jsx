var React = require("react");
var DefaultLayout = require('./default');

class Artists extends React.Component {
  render() {
    console.log('within artists.jsx ',this.props)
    const artists = this.props.list.map( (artist) => {
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