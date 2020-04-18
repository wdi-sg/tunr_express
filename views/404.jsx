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
                    <h1>Page not Found!</h1>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = NotFoundPage;