var React = require('react');

class CreatedNew extends React.Component {
  render() {
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
            let Capitalize = (str) => {
                return str.charAt(0).toUpperCase() + str.slice(1) };
    return (
      <html>
        <body>
          <div>
            <h1>Hey there, you've added <span style={{ color: "#4DDDD0", fontWeight: "lighter"}}> {Capitalize(this.props.newArtist.name)} </span></h1>
            <h3>Want to see a picture of the artist that you have just added? Here you go! </h3>
            <img src={this.props.newArtist.photo_url}/>
            <p>This artist is from {Capitalize(this.props.newArtist.nationality)} </p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = CreatedNew;