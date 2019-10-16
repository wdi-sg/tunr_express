var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
          <body>
            <h1>Welcome to Spoopify!</h1>
              <form action='/artists/new'>
                <input type='submit' value='Add New Artist!' />
              </form>
              <form action='/artists/all'>
                <input type='submit' value='See All Artists!' />
              </form>
              <form action='/playlist'>
                <input type='submit' value='playlist' />
              </form>
          </body>
      </html>
    );
  }
}

module.exports = Home;
