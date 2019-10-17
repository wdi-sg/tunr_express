var React = require('react');

class indexPlaylists extends React.Component {
  render() {
console.log("this is it!!!!!!!!!!!!!!!!!!!!!!!!!!!!" , this.props.searched);

    let list = this.props.searched.map(id => {
        return <li> {id.name}</li>
    });

    return (
      <html>
        <body>
          <div>
            <h1>Playlists</h1>
            
            <form action="/playlists" method="GET">
                <p>Sort by...</p>
                <select>
                    <option value="id">By ID</option>
                    <option value="name">By Name</option>
                    <option value="nationality">By Nationality</option>
                    
                </select>
                <input type="submit" value="Submit"/>
            </form> 
            <br/>
            <div><ul>{list}</ul></div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = indexPlaylists;