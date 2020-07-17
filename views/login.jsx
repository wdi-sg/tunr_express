var React = require('react');

class LogIn extends React.Component {
    render() {
        return (
            <html>
            <body>
            <h1>LOG IN</h1>
            <form method = "POST" action='/login'>
                <p>
                name
                <input name ="name"/>
                </p>
                <p>
                password
                <input name ="password"/>
                </p>
                <p>
                <input type ="submit"/>
                </p>
                </form>

            </body>

            </html>)
    }
}


module.exports = LogIn;