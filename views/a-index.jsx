const React = require('react');

class Index extends React.Component {
  render(){
    const list = this.props.rows.map(artist  => {
     return (
       <div>
        <p>{artist.id}</p>
        <p>{artist.name}</p>
        <p>{artist.photo_url}</p>
        <p>{artist.nationality}</p>
       </div>
     );
    })
    return(
      <html>
        <body>
          <h1>Index</h1>
          {list}
        </body>
      </html>
    )
  }
}

module.exports = Index;