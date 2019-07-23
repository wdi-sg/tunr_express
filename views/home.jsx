var React = require('react');
var Layout = require('./components/layout.jsx');

class Home extends React.Component {
  render() {
    const artistCards = this.props.artists.map(artists =>{
        let artistPage = "/artists/"+artists.id;
        return (
            <div className = "artistCards">
                <a href = {artistPage}>
                    <img src = {artists.photo_url}/>
                    <h1>Name: {artists.name}</h1>
                </a>
                <h1>Nationality: {artists.nationality}</h1>
            </div>
        )
    });

    return(
        <Layout>
            <div className = "container">
                <div class = "artistContainer">
                    {artistCards}
                </div>
            </div>
        </Layout>
    )
  }
}


module.exports = Home;