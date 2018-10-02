const React = require('react');

class Update extends React.Component {

    render() {

        let url = '/' + this.props.selected.id + '?_method=PUT';

        return(
            <html>
            <head />
            <body>
              <h1>Enter A New Artist</h1>
              <form method="POST" action={url}>
                <p>Name:</p>
                <input type="text" name="name" value={this.props.selected.name} autoComplete="off" required />
                <p>Nationality:</p>
                <input type="text" name="nationality" value={this.props.selected.nationality} autoComplete="off" required />
                <p>Photo URL:</p>
                <input type="text" name="photo_url" value={this.props.selected.photo_url} autoComplete="off" required />
                <br/>
                <br/>
                <input type="submit" value="Submit" />
              </form>
            </body>
          </html>
    )};
};

module.exports = Update;