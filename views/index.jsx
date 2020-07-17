const React = require('react');
const Layout = require('./layout');

class Home extends React.Component {
    render() {
// function to generate cards
        const artistArray = this.props.rows;
        const cards = artistArray.map(artist=>{
            return (
                <div className="card">
                    <img src={artist.photo_url} className="card-img"/>
                    <div className="d-flex justify-content-center card-img-overlay" style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
                        <h5 className="align-self-center card-title">{artist.name}</h5>
                    </div>
                    <a className="stretched-link" href={"/artists/"+artist.id}/>
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