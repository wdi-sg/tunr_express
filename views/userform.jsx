const React = require('react');
const Template = require('./template');

class UserForm extends Template {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.count = props.sitecount || "YOU DIDN'T PASS A COUNTER (sitecount)";
  }

  renderContent() {
    let button = this.props.button;
    let action = this.props.action;
    return (
      <form action={action} method="POST" className="my-3">
        <p className="text-danger">{this.props.error}</p>
        <p className="text-info h4">{this.props.title}</p>
        <div className="form-group">
          <input type="text"
                 className="form-control"
                 name="username"
                 placeholder="User Name"
          />
        </div>
        <div className="form-group">
          <input type="password"
                 className="form-control"
                 name="password"
                 placeholder="Password"
          />
        </div>
        <input type="submit" className="btn btn-info btn-block" value={button}/>
      </form>
    );
  }
}

module.exports = UserForm;
