var React = require("react");

class Home extends React.Component {
  render() {
    const artistsList = this.props.artists.map(item => {

        return (
        <div>
        <h1>Welcome!</h1>
          <h5>Id: {item.id}</h5>
          <h5>Artist Name: {item.name} </h5>
          <h5>Artist Nationality: {item.nationality}</h5>
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

module.exports = Home;