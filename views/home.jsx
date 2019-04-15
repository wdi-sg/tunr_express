var React = require("react");

class Home extends React.Component {
  render(){
    console.log("at jsx:");
    // console.log(this.props.requestedQuery[0].id);

    let showData = this.props.stuff.map (artists => {
        return (
            <div>
                <p> {artists.id} </p>
                <p> {artists.name} </p>
                <p> {artists.photo_url} </p>
                <p> {artists.nationality} </p>
            </div>
            )
    });

    return (
      <html>
        <head>
            <title>Tunr 1.0</title>
        </head>
        <body>
            <h1>Tunr 1.0 Database</h1>
            <div className="displayContainer">
                {showData}
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;