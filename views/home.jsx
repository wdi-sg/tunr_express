var React = require("react");

class Home extends React.Component {
  render() {

    const artistDetails = this.props;
    let artistArray = [];

   for (const item in artistDetails){
        if (artistDetails[item].name !== undefined){
            artistArray.push(artistDetails[item].name)
        }
    }

    let artistList = artistArray.map(entry =>{
        return <li>{entry}</li>
    })


    // let artistList = name.map(entry => return <li>{entry}</li>)
    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Tunr!</h1>
          <h2>List of artists</h2>
          <ul>
          {artistList}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;