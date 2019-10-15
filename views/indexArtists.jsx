var React = require('react');

class indexArtists extends React.Component {
  render() {
console.log("this is it!!!!!!!!!!!!!!!!!!!!!!!!!!!!" , this.props.searched);

//bunch of JS code
//establish var = link
//establish variables/functions/conditionals
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
            <br/>
            <div><ul>{list}</ul></div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = indexArtists;