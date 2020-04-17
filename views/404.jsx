const React = require("react");

import Head from './page-components/head-component';
import Header from './page-components/header-component';

class NotFoundPage extends React.Component {
    render() {
        return (
            <html>
                <head />
                <body>
                <Header />

                    <main>
                    <h1>Page not Found! TUNR</h1>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = NotFoundPage;