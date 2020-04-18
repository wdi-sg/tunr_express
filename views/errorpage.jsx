const React = require('react');
const Head = require('./head');

class ErrorPage extends React.Component {
  render() {
    let error = this.props.errorinfo;
    console.log(error);

    let errorInfo = Object.keys(error).map(ele => {
      return (
        <tr key={ele}>
          <th scope="row">{ele}</th>
          <td>{error[ele]}</td>
        </tr>
        )
      }
    );

    return (
      <html>
        <head>
          <link rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                crossOrigin="anonymous"
          />
        </head>

        <body>
          <div className="container">
            <div className="row my-3">
              <div className="col">
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
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ErrorPage;
