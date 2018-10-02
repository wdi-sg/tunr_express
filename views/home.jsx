var React = require("react");

class Home extends React.Component {
  render() {

    let artist = this.props.result.map((element) => {

        return <tr>
                <td>
                    {element.id}
                </td>
                <td>
                    {element.name}
                </td>
                <td>
                    {element.nationality}
                </td>
                <td>
                    <img height="100px" width="100px" src={element.photo_url}/>
                </td>
               </tr>
    })

    return (
      <html>
        <head />
        <body>
          <h1>All Artists</h1>
          <table border="black">
            <thead>
                <tr>
                    <td>
                        ID
                    </td>
                    <td>
                        NAME
                    </td>
                    <td>
                        NATIONALITY
                    </td>
                    <td>
                        PHOTO
                    </td>
                </tr>
            </thead>
            <tbody>
                {artist}
            </tbody>
          </table>
          <a href="/new"><button>Add Artist</button></a>
        </body>
      </html>
    );
  }
}

module.exports = Home;
