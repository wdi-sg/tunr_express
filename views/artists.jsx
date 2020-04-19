var React = require("react");
class Artists extends React.Component {
  render() {
    const square = {
      // width: '248px',
      height: '250px',
      objectFit: 'cover'
    };
    const square2 = {
      width: '250px',
      height: '250px',
    };

    var artists = this.props.artists;
    if (artists.length == 0) {
      artists = [
        <li key="Not Found" className="border-dark border-bottom">
          <h2>Artist not found</h2>
        </li>
      ]
    }
    else if (artists.length == 1) {
      artists = artists.map((element, index) => {
        return <li key={element.name} className="border-dark border-bottom">
          <h2>{element.name}</h2>
          <br />
          <img src={`${element.photo_url}`} className=" img-thumbnail " />
          <br />
          <h3> Nationality: {element.nationality}</h3>
          <br />
        </li>
      })
    }
    else {
      artists = artists.map((element) => {
      return <a key={element.name} className = "text-dark" href={`artists/${element.artistid}`}><div className="card text-center bg-light">
        <img style = {square} className="card-img-top" src={`${element.photo_url}`} alt="Card image cap"></img>
        <div className="card-body">
          <h5 className="card-title"> {element.artistid}. {element.name}</h5>
          <p className="card-text">Nationality: {element.nationality}</p>
        </div>
      </div>
      </a>
      
      })
    }
    

    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>


        </head>
        <body className="bg-secondary">
          <div className="container-fluid">
            <h1 className="text-center w-75 ml-auto mr-auto bg-dark text-light"><em><u>Artists</u></em></h1>
            <div className = "row row-cols-3 w-75 ml-auto mr-auto">
              {artists}
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Artists;
