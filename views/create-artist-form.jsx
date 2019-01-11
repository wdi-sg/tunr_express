var React = require('react');
var DefaultLayout = require ('./default');

class New extends React.Component {
  render() {
    return (
        <DefaultLayout>
            <h3>Form New Artist!</h3>
            <form action="/song" method="POST">
                <label> Artist Name: </label>
                <input name="name" placeholder="Enter artist name"/>   <br/>
                <label> Photo: </label>
                <input name="photo_url" placeholder="Enter photo url"/>   <br/>
                <label> Nationality: </label>
                <input name="nationality" placeholder="Enter nationality"/>   <br/>
                <button type="button submit" class="btn btn-primary my-3">Submit</button>
            </form>
        </DefaultLayout>

    );
  }
}

module.exports = New;