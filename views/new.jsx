const React = require('react');
const DefaultLayout = require('./layouts/default');


class New extends React.Component {
  render() {

    let headerTitle = "New Artist | Tunr";

    return (

      <DefaultLayout title={headerTitle}>

        <h1>Create New Artist</h1>

        <form method="POST" action="/artists">
            <p>Name:</p>
            <input type={"text"} name={"name"} required/>
            <p>Nationality:</p>
            <input type={"text"} name={"nationality"} required/>
            <p>Photo Link:</p>
            <input type={"text"} name={"photo_url"} required/>
            <br/>
            <br/>
             <input type="submit" value="CREATE ARTIST"/>
        </form>

      </DefaultLayout>
    );
  }
}

module.exports = New;