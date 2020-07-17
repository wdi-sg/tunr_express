var React = require("react");

class Index extends React.Component {
  render() {
    const artistsList = this.props.artists.map(item => {

        return (
        <div>

          <h3>Id: {item.id}</h3>
          <h3>Artist Name: {item.name} </h3>
          <h3>Artist Nationality: {item.nationality}</h3>
          <img width="500px" src={item.photo_url} />
          </div>
          )
});


         return (
      <html>
        <head />
        <body>
          {artistsList}
        </body>
      </html>
    );




}


}

module.exports = Index;