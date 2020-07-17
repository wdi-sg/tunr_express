var React = require("react");

class Homepage extends React.Component {
    render() {
        console.log(this.props.artists);

        let artistsList = this.props.artists.map(artists => {
            var url = "/home";

            return(

                <div>
                    <a href = {url}>
                        <img src= {artists.photo_url}/>
                    </a>
                    <p>Artist Name: {artists.name}</p>
                    <p>Artist Nationality: {artists.nationality}</p>
                </div>
            )//return
         }); //.map CT

        return(
            <html>
            <head />
                <body>

                    <h1>Welcome!</h1>
                    <h2>FEATURED ARTISTS</h2>
                    <p>{artistsList}</p>
                </body>
            </html>
        );//return
    }//render CT
}//Hompage CT

module.exports = Homepage;