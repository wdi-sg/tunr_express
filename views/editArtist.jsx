var React = require("react");

class New extends React.Component {

  render() {
        const link = "/artists/"+this.props.artist[0].id+"?_method=put";
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>

            <form method="POST" action={link}   style={{textAlign: "Center"}}>
                <span>Name: </span>
                    <input  id= "name" type="text" name="name" placeholder="Enter Name" required
                            oninvalid="this.setCustomValidity('Enter Valid Name Here')"
                            oninput="this.setCustomValidity('')" value={this.props.artist[0].name}></input>
                    <br></br><br></br>
                <span>Imgage Source: </span>
                    <input type="text" name="img" placeholder="Enter link" required
    oninvalid="this.setCustomValidity('Enter Valid link Here')"
    oninput="this.setCustomValidity('')" value={this.props.artist[0].photo_url}></input>
                    <br></br><br></br>
                    <span>Nationality: </span>
                    <input type="text" name="nationality" placeholder="Enter Nationality" required
    oninvalid="this.setCustomValidity('Enter Nationality Here')"
    oninput="this.setCustomValidity('')" value={this.props.artist[0].nationality}></input>

                    <br></br><br></br>
                    <input type="submit" value="Submit"></input>
                </form>
        </body>
      </html>
    );
  }
}

module.exports = New;