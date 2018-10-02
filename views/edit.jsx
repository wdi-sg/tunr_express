var React = require("react");

class New extends React.Component {
  render() {

let artistSelected = this.props.artists;
// console.log(artistSelected);

let actionPath = "/artists/" + artistSelected.name + "?_method=PUT"
console.log("------------------------------");

    return (
      <html>
        <head />
        <body>
          <h3>Edit artists information:</h3>
            <div>
                <form method = "POST" action ={actionPath}>
                    <div></div>
                        Name:
                        <input name="name" value={artistSelected.name}/>
                        <br></br>
                        Photo URL:
                        <input name="photo_url" value={artistSelected.photo_url}/>
                        <br></br>
                        Nationality:
                        <input name="nationality" value={artistSelected.nationality}/>
                        <br></br>
                        <br></br>
                    <input type = "submit" value = "Submit"></input>
                </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = New;

