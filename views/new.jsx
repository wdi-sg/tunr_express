var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")

class New extends React.Component {
    render() {
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h3>Enter Artist Details</h3>
                        <div className="col-6">
                            <form action="/artists" method="POST">
                                <div className="form-group">
                                    <label>Name :</label>
                                    <input type="text" className="form-control" placeholder="Name of Artist" name="name"/>
                                </div>
                                <div className="form-group">
                                    <label>Photo URL :</label>
                                    <input type="text" className="form-control" placeholder="URL" name="photo_url"/>
                                </div>
                                <div className="form-group">
                                    <label>Nationality :</label>
                                    <input type="text" className="form-control" placeholder="Nationality" name="nationality"/>
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

module.exports = New;
