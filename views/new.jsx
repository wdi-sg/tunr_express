var React = require("react");

class New extends React.Component {
    render() {
        return (<html>
            <head/>
            <body>
                <h1>Add new artist</h1>
                <form action="/artists" method="POST">
                    name:
                    <input type="text" name="name"/><br/>
                    photo_url:
                    <input type="text" name="photo_url"/><br/>
                    nationality:
                    <input type="text" name="nationality"/><br/>
                    <input type="submit"/>
                </form>
            </body>
        </html>);
    }
}

module.exports = New;
