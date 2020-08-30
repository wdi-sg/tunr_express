var React = require("react");

class Home extends React.Component {
  render() {

    const artistDetails = this.props;
    let artistArray = [];
    let artistIndex = [];

   for (const item in artistDetails){
        if (artistDetails[item].name !== undefined){
            artistArray.push(artistDetails[item].name)
            artistIndex.push(artistDetails[item].id)
        }
    }

    let artistList = artistArray.map(entry =>{
        return <li>{entry}</li>
    })

    console.log(artistIndex);

    return (
      <html>
        <head />
        <body>
            <div>
                <h1>Welcome to Tunr!</h1>
                <h2>List of artists</h2>
                <ul>
                {artistList}
                </ul>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;