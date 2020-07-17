var React = require("react");

class Login extends React.Component {
    var state = {
        redirect: false,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                redirect: true,
            })
        }, 2000)
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={'/artists'} />
            )
        }

        return (
            <div>
                Redirecting to "/" in two seconds
            </div>
        )
    }
}

module.exports = Login;
