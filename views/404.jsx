const React = require("react");

import Head from './page-components/head-component';
import Header from './page-components/header-component';

class NotFoundPage extends React.Component {
    render() {
        return (
            <html>
                <Head />
                <div className="overlay"></div>
                <body>
                <Header />
                    <main>
                    <div className="banner">
                        <div className="landing-page__nav not-found__nav">
                            <div className="overlay"></div>
                            <a href="/" className=" landing-page-link">PAGE DOESN'T EXIST, LET ME TAKE YOU BACK HOME</a>
                        </div>
                    </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = NotFoundPage;