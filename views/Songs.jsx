var React = require("react");

class Info extends React.Component {
  render() {
    const songTitles = this.props.title; //array of objects
    console.log(songTitles);
    const titleList= songTitles.map( song => {
        return <li>{song.title}</li>
    });
    return (
      <html>
        <title>{this.props.name}</title>
        <head/>
        <body>
           <h3>{this.props.name}</h3>
            <div>
                <ol>
                {titleList}
                </ol>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Info;
