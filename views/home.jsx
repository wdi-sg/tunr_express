var React = require("react");

class Home extends React.Component {
  render() {

    const artistsList = this.props.rows.map(artistName =>{

        return <li>{artistName.name}</li>
    })

    return (
      <html>
        <head />
        <body>
          <h1>All Artists Names</h1>
          <ul>
            {artistsList}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;