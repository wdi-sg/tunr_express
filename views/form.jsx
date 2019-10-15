var React = require('react');

class Form extends React.Component {
    render() {
        return (<html>
            <body>
                <h2>New Artist!</h2>
                <form method="POST" action="/artists">
                    <p>Artist Name:</p>
                    <input type="text" name="name"/>
                    <br/>
                    <p>Artist URL:</p>
                    <input type="url" name="photo_url"/>
                    <br/>
                    <p>Artist Nationality:</p>
                    <input type="text" name="nationality"/>
                    <br/>
                    <input type="submit" value="Submit"/>
                    <br/>
                </form>
            </body>
        </html>);
    }
}

module.exports = Form;
