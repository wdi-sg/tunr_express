var React = require("react");

class Home extends React.Component {

  render() {

     const name = this.props.list.map((artist,i)=>{
           return <a href = {`/artists/${artist.id}`}><li key = {i}> {artist.name} </li></a>
        })
    return (
      <html>

        <body>
        <h1> ARTISTS </h1>
            <ol>
                {name}
            </ol>
        </body>
      </html>
    );
  }
}

module.exports = Home;