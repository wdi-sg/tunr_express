var React = require("react");
var DefaultLayout = require('./layout/default')


class New extends React.Component {
  render() {

    let actionUrl = '/artists'

    return (
      <html>
        <head />
        <body>

            <DefaultLayout title = "New Task">

          <h3>Form Goes Here!</h3>
        </body>
      </html>


        <form method = 'POST' action = {actionURL} >
        <input type = 'text' name= 'name' placeholder= 'Insert new task' required/>
        <input type = 'text' name= 'photo_url' placeholder= 'Add task' />
        <input type = 'text' name= 'nationality' placeholder= 'Add task' />
        <input type = 'submit' value= 'submit'/>



    </DefaultLayout>
    );
  }
}

    module.exports = New;




