var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {

    return (
    <Layout title="New Artist">
      <h1>New Artist</h1>
      <form method="POST" action="/artists/new">
        <label>Name:</label>
        <input name="name" required autoComplete="off"/>
        <label>Photo URL:</label>
        <input name="photo_url" required autoComplete="off"/>
        <label>Nationality:</label>
        <input name="nationality" required autoComplete="off"/>
        <input type="submit" value="Submit"/><br/>
      </form>
    </Layout>
    )
  }
}

module.exports = Home;
