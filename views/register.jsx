var React = require('react');

class Register extends React.Component {
    render() {
        return (
            <html>
                <body>
                    <form method="POST" action = "/register">
                    <h1> PLEASE REGISTER !! </h1>
                        <p>
                            Name
                            <br/>
                            <input name ="name"/>
                        </p>
                        <p>
                            Password
                            <br/>
                            <input name ="password" type="password"/>
                        </p>
                        <p>
                            <input type ="submit"/>
                        </p>
                    </form>
                </body>
            </html>
        );
    }
}

module.exports = Register;