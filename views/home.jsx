var React = require("react");

class Home extends React.Component {
  render() {

    const table = this.props.artists.map(item => {
      return (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Photo</th>
              <th>Nationality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td><img width="100px" src={item.photo_url} alt="photo of artist"/></td>
              <td>{item.nationality}</td>
            </tr>
          </tbody>
        </table>
      )        
    })

    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Tunr! The world's #1 music catalog/player</h1>
          {table}
        </body>
      </html>
    );
  }
}

module.exports = Home;
