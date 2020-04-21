var React = require("react");
var DefaultLayout = require("./layouts/default");

class New extends React.Component {
    render() {
        return (<DefaultLayout loggedIn={this.props.loggedIn} title="Add new artist">
                <h1>Add new artist</h1>
                <form action="/artists" method="POST">
                    name:
                    <input type="text" name="name"/><br/>
                    photo_url:
                    <input type="text" name="photo_url"/><br/>
                    nationality:
                    <input type="text" name="nationality"/><br/>
                    <input type="submit" className="btn btn-primary"/>
                </DefaultLayout>);
    }
}

module.exports = New;
