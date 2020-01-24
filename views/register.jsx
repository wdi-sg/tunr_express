var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")

class Register extends React.Component {
    render() {
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h3>Enter User Details</h3>
                        <div className="col-6">
                            <form action="/users" method="POST">
                                <div className="form-group">
                                    <label>Name :</label>
                                    <input type="text" className="form-control" placeholder="Username" name="name"/>
                                    <label type="text" className="font-red">{this.props.invalid}</label>
                                </div>
                                <div className="form-group">
                                    <label>Photo URL :</label>
                                    <input type="text" className="form-control" placeholder="Password" name="password"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Register;