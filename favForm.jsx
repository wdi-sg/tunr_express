var React = require('react');

class Favourite extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>TUNR_DB</h1>
            <form action="/favourites" method="POST">
                <p>
                    Song:
                    <input name="name"/>
                </p>
                
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Favourite;