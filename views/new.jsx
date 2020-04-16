var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
            <form method="POST" action="/artists"  style={{textAlign: "Center"}}>
                <span>Name: </span>
                    <input  id= "name" type="text" name="name" placeholder="Enter Name" required
                            oninvalid="this.setCustomValidity('Enter Valid Name Here')"
                            oninput="this.setCustomValidity('')" ></input>
                    <br></br><br></br>
                <span>Imgage Source: </span>
                    <input type="text" name="img" placeholder="Enter link" required
    oninvalid="this.setCustomValidity('Enter Valid link Here')"
    oninput="this.setCustomValidity('')"></input>
                    <br></br><br></br>
                    <span>Nationality: </span>
                    <input type="text" name="nationality" placeholder="Enter Nationality" required
    oninvalid="this.setCustomValidity('Enter Nationality Here')"
    oninput="this.setCustomValidity('')"></input>

                    <br></br><br></br>
                    <input type="submit" value="Submit"></input>
                </form>
        </body>
      </html>
    );
  }
}

module.exports = New;