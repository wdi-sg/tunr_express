var React = require('react');

class Home extends React.Component {
  render() {
    const artistCards = this.props.artists.map(artists =>{
        let artistPage = "/artists"+artists.id;
        return (
            <div>
                <a href = {artistPage}>
                    <img src = {artists.photo_url}/>
                    <h1>Name: {artists.name}</h1>
                </a>
                <h1>Nationality: {artists.nationality}</h1>
            </div>
        )
    });

    return(
        <html>
            <body>
                <div>
                    {artistCards}
                </div>
            </body>
        </html>
    )
  }
}


module.exports = Home;