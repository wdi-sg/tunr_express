var React = require("react");

class showSingleArtist extends React.Component {

  render() {
     console.log(this.props.artist);
    const artist = this.props.artists.map(item => {
        return(
          <div>
              <main  style={{ margin: '0 auto',  width: '800px', fontFamily: 'Montserrat'}} >
         <h5>Id: {item.id}</h5>
          <h5>Artist Name: {item.name} </h5>
          <h5>Artist Nationality: {item.nationality}</h5>
          <img width="500px" src={item.photo_url} />
        </main>
        </div>

          )

       });

    return (
      <html>
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville&display=swap" rel="stylesheet"></link>
        </head>
        <body>
        {artist}

        </body>
      </html>
    );


  }
};


module.exports = showSingleArtist;