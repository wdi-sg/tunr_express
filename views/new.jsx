var React = require("react");
var Layout = require('./components/layout.jsx');

class New extends React.Component {
  render() {
    return (
      <Layout>
            <h1> Add New Artist! </h1>
            <form action ="/new" method ="POST">

                <h2>Name</h2>
                <input type="text" name="name" placeholder="Name"/>

                <h2>Image</h2>
                <input type="text" name="photo_url" placeholder="Image Url"/>

                <h2>Nationality</h2>
                <input type="text" name="nationality" placeholder="Nationality"/>
                <br/><br/>
                <input type="submit"/>
            </form>
        </Layout>
    );
  }
}

module.exports = New;