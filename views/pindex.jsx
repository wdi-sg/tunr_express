const React = require('react');
const Layout = require('./layout');

class Home extends React.Component {
    render() {
// function to generate cards
        const playlistArray = this.props.rows;
        const cards = playlistArray.map(playlist=>{
            return (
                <div className="card">
                    <h5 className="card-title">{playlist.name}</h5>
                    <a className="stretched-link" href={"/playlists/"+playlist.id}/>
                </div>
            );
        });
// html tags to render
        return (
            <Layout>
                <div className="card-columns">
                    {cards}
                </div>
            </Layout>
        );
    };
};

module.exports = Home;