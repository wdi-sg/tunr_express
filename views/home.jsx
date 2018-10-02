var React = require("react");

class Home extends React.Component {
  render() {
    var artArray = this.props.artists;
    // console.log(artArray);
    let artElements = artArray.map(item => {
        return <div>
            <li key={item.id}>{item.name} from {item.nationality}
                <br></br>
                <img style= {{height: 200}} src={item.photo_url}/>
            </li>
            <br></br>
        </div>
    });

    //display list of artists using JSX
    return (

      <html>
        <head/>
        <body>
          <ul>
            {artElements}
          </ul>
        </body>
      </html>

    );
  }
}

module.exports = Home;


