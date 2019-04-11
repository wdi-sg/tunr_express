var React = require("react");

// BackToHome redirects to /
class BackToHome extends React.Component {
    render() {

        return (
            <div>
                <form method="get" action="/">
                <input type="submit" value="Back to Home"/>
                </form>
            </div>
        )
    }
};