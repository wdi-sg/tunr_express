var React = require("react");

class Home extends React.Component {
  render() {
    let list = this.props.result.map(item => {
      return <li>
        <h3> <a href={"/artists/" + item.id }>{item.name}</a> </h3>


      </li>;
    });
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          ></link>
        </head>
        <body>
          <div className="container mt-5">
          <h1 className="text-center">Welcome!</h1>

<a className="btn btn-primary btn text-light mb-5"
  href="/artists/new"
>
  Add a new artist
</a>
<ol>{list}</ol>
          </div>
         
        </body>
      </html>
    );
  }
}

module.exports = Home;
