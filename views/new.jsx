var React = require('react');

class New extends React.Component {
  render() {
    return (
      <form method="POST" action="/artists">
            Add an Artist:
            <div>
            Name: 
            <input type="text" name="name"/>
            </div>
            <div>
            URL of Photo:
            <input type="text" name="photo_url"/>
            </div>
            <div>
            Nationality:
            <input type="text" name="nationality"/>
            </div>
            <div>
            <input type="submit" value="Submit"/>
            </div>
        </form>
    )
  }
}

module.exports = New;