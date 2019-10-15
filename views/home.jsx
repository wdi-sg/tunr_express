const React = require("react");
const Layout = require('./layout');

class Home extends React.Component {
    render() {
        return (
            <Layout>
                <div className="d-flex justify-content-center">
                    <img src="https://camo.githubusercontent.com/35e6f40a123bc0498fcce97d3848e91ad53a2f9f/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f6b75354563466534504e4757412f67697068792e676966" className="img-fluid"/>
                </div>
            </Layout>
        );
    };
};

module.exports = Home;