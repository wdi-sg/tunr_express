const React = require('react');
const Template = require('./template');

class ErrorPage extends Template {
  constructor(props) {
    super(props);
    this.title = "Tunr Error";
    this.count = props.sitecount || "YOU DIDN'T PASS A COUNTER (sitecount)";
  }

  renderContent() {
    let error = this.props.errorinfo;

    let errorInfo = Object.keys(error).map(ele => {
      return (
        <tr key={ele}>
          <th scope="row">{ele}</th>
          <td>{error[ele]}</td>
        </tr>
      )
    });

    return (
      <React.Fragment>
        <h5 class="p-2 bg-danger text-white rounded-lg text-center">Couldn't do it. Here's an error dump:</h5>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Error</th>
              <th scope="col">Error Text</th>
            </tr>
          </thead>
          <tbody>
            {errorInfo}
          </tbody>
        </table>
        <a href="/artists"
           className="btn btn-info btn-block">
          Back to Artist List
        </a>
      </React.Fragment>
    );
  }
}

module.exports = ErrorPage;
