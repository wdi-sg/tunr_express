var React = require("react");
var DefaultLayout = require('./layout/default');


class New extends React.Component {
  render() {
    let actionURL = '/artists'
    return (
                <DefaultLayout title="New Task">

          <h3>Form Goes Here!</h3>

          <form method = 'POST' action = {actionURL} >
          <input type='text' name='name' placeholder='Insert new task' required/>
          <input type='text' name='photo_url' placeholder='Add label' />
          <input type='text' name='nationality' placeholder='Add label' />
          <input type='submit' value='Submit' class="submit"/>
          </form>

        </DefaultLayout>
    );
  }
}

module.exports = New;
