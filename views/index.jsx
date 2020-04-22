var React = require("react");

class Index extends React.Component {
  render() {
      const artistElements = this.props.artistNames.map((artistName) => {
            return <li>{artistName.name}</li>
      })
    return (
      <html>
        <head />
        <body>
         <div>
            <h1>artist list</h1>
            <div>
                <p>
                  <ul>
                     {artistElements}
                  </ul>
                </p>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Index;
