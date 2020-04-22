var React = require("react");

class Show extends React.Component {
  render() {
    console.log(this.props);
    let idElement = this.props.id;
    let nameElement = this.props.name;
    let photoElement = this.props.photo_url;
    let nationElement = this.props.nationality;
    console.log(idElement);
    console.log(nameElement);
    console.log(photoElement);
    console.log(nationElement);
    return (
      <html>
        <head />
        <body>
        <div>
            <h1>{nameElement}</h1>
            <p>{nationElement}</p>

            <div>
                <img src={photoElement}></img>
            </div>
            <a href="/artists"><button>return home</button></a>
            <a href="/artists/new"><button>create new</button></a>
        </div>
        </body>
      </html>
    );
  }
}

module.exports = Show;