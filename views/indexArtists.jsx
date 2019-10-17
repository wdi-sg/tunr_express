var React = require('react');

class indexArtists extends React.Component {
  render() {
    let list = this.props.searched.map(id => {
        return <li> {id.name}</li>
    });

    return (
      <html>
        <body>
          <div>
            <h1>Artists Index</h1>
            
            <form action="/artists" method="GET">
                <p>Sort by...</p>
                <select>
                    <option value="id">By ID</option>
                    <option value="name">By Name</option>
                    <option value="nationality">By Nationality</option>
                    
                </select>
                <input type="submit" value="Submit"/>
            </form> 

            <form action="/artists/new" method="GET">
            <button>Click here to add new artist!</button>
            </form>

            <a type="button" href="/artists/new">Click here to add new artist!</a>
            
            <br/>

            <div><ul>{list}</ul></div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = indexArtists;