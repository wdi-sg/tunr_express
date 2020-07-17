const React = require("react");

class GetUserCredentials extends React.Component {
  render() {
    const {type} = this.props;
    return (
      <div>
        <form action={`/${type.toLowerCase()}`} method="post">
          <div>
            <label htmlFor="name">User name: </label>
            <input type="text" name="name"/>
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password"/>
          </div>
          <input type="submit" value={type} />
        </form>
      </div>
    );
  }
}

module.exports = GetUserCredentials;
