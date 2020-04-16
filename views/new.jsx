var React = require("react");
var Layout = require('./layout');

class New extends React.Component {
  render() {
    return (
      <Layout>
          <form action = "artists/new" method = "POST">
              <div class="form-group">
                <label for="exampleFormControlInput1">Name:</label>
                <input type="text" class="form-control" name="name" placeholder="Name"/>
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Nationality</label>
                <select class="form-control" name="nationality">
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Belgium">Belgium</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Brazil">Brazil</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Canada">Canada</option>
                <option value="China">China</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Image</label>
                <input type="text" class="form-control" name="img" placeholder="Image URL"/>
              </div>
              <input class="btn btn-secondary btn-lg" type="submit" value="Submit"/>
            </form>
        </Layout>
    );
  }
}

module.exports = New;