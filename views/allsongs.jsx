const React = require('react');
const Layout = require('./layout');
//  <a className="stretched-link" href={"/artists/"+song.id}/>
class AllSongs extends React.Component {
    render() {
// function to generate cards
        const songsArray = this.props.rows;
        const lists = songsArray.map(song=>{
            return (
                <div className="card form-group m-1">
                    <div className="card-body">
                        <h5 className="card-title">Title: <a href={"/songs/"+song.id}>{song.title}</a></h5>
                        <p className="card-text">Album: {song.album}</p>
                    </div>
                    <div className="card-footer">
                        <small class="text-muted d-flex justify-content-center">
                            <input type="checkbox" className="form-check-input" id={song.id} name={song.id}/>
                            <label className="form-check-label" for={song.id}>Add</label>
                        </small>
                    </div>
                </div>
            );
        });
// html tags to render
        return (
            <Layout>
                <h1 className="display-4">Add Songs</h1>
                <form method="POST" action="/favorites" className="d-flex flex-row flex-wrap">
                    {lists}
                    <input type="submit" className="btn btn-success btn-block" value="Add!"/>
                </form>
            </Layout>
        );
    };
};

module.exports = AllSongs;