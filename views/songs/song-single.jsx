const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class SingleSong extends React.Component {

    render() {

        return (
            <html>
                <Head />
                <div className="overlay"></div>
                <body>
                    <Header />
                    <main>
                        <div className="banner">
                            <a href="/" className="nav__link home-link"><p>Home</p></a>
                            <a href="/artists/" className="nav__link show-all-artists"><p>All Artists</p></a>
                        </div>
                        <div className="single-song__container">
                            <div className="single-song__img-container">
                                <img src={`http://a3.mzstatic.com/us/r30/Features/d6/ba/99/dj.homcvzwl.60x60-50.jpg`} alt={this.props.singleSong.title} className="single-song__img"/>
                            </div>
                            <p className="single-song__title">{this.props.singleSong.title}</p>
                            <p className="single-song__album">{this.props.singleSong.album}</p>
                            <div className ="song__edit-delete-links">
                                <a href="./edit" className="recipe__edit-link">Edit</a>
                                <a href="./delete" className="recipe__delete-link">Delete Song</a>
                            </div>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = SingleSong;