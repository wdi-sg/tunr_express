var React = require("react");

class Home extends React.Component {
  render() {

    const artistDetail=this.props.artist.map(artist=>
        {console.log(artist);
            const url="/artists/"+artist.id;
            return <div class={"col-4 text-center border"}>
            <div class={"row"} style={{height:"50%"}}>
            <div class={"col-12"}>
            <img style={{width: "100%", height:"400px"}} src={artist.photo_url}></img>
            </div>
            </div>
            <div class={"row align-bottom mt-5"}>
            <div class={"col-12 mt-5"}>
            <p  class={"mt-3"}>Name: <a href={url}>{artist.name}</a></p>
            <p>Nationality: {artist.nationality}</p>
            </div>
            </div>
            </div>
        });

    return (
      <html>
        <head/>
        <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"} integrity={"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"} crossorigin={"anonymous"}></link>
        <body>
        <div class={"container border mt-5"}>
            <div class={"row text-center mt-3"}>
                <div class={"col-12 text-center"}>
                <h1>Artists</h1>
                </div>
            </div>
            <div class="row">
                {artistDetail}
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;