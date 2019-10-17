const React = require('react');
const Layout = require('./layout');
//  <a className="stretched-link" href={"/artists/"+song.id}/>
class UserSongs extends React.Component {
    render() {
// function to generate cards
        const songsArray = this.props.rows;
        const lists = songsArray.map(song=>{
            return (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{song.title}</h5>
                        <h6 className="card-subtitle mb-2">Album: {song.album}</h6>
                    </div>
                </div>
            );
        });
// html tags to render
        return (
            <Layout>
                <h1 className="display-4">Favorite Songs</h1>
                <div class="card-columns">
                    {lists}
                </div>
            </Layout>
        );
    };
};

module.exports = UserSongs;