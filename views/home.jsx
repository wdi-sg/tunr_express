var React = require('react');

class Home extends React.Component {
  render() {
    const artistlist = this.props.artists.map((td) => { 
    return (
      <div>
      <li> Name: {td.name}, Nationality: {td.nationality}</li> 
      <br></br>
      <p><img src={td.photo_url} style={{height: 150, width: 150}}/></p>   
      </div>   
        )
    });

    return (
      <div>
        <h1>Artists</h1>
        <ul>
            {artistlist}
        </ul>
      </div>
    );
  }
}

module.exports = Home;


    
