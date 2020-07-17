const React = require('react');
const Layout = require('./layout');

class Showsongs extends React.Component {
    render() {
// grab and destructure object
        let cards = this.props.rows.map(song=>{
            let {title, album, preview_link, artwork, artist_id} = song;
            return (
                /*<div className="card">
                    <img src={artwork} className="card-img"/>
                    <div className="d-flex justify-content-center card-img-overlay" style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
                        <h5 className="align-self-center card-title">{artist.name}</h5>
                    </div>
                    <a className="stretched-link" href={"/artists/"+artist.id}/>
                </div>*/
                <div className="card">
                    <img src={artwork} className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{album}</p>
                    </div>
                </div>
            );
        });
        return (
            <Layout>
                <div className="card-columns">
                    {cards}
                </div>
            </Layout>
        );
    };
};

module.exports = Showsongs;