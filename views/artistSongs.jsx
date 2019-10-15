var React = require("react");

class Home extends React.Component {
  render() {
  let list = this.props.result.map(item => {
    return(
        <li>{item.title}</li>
    )
  })
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
            
          <h1>Songs Of {this.props.result.name}</h1>

          <ol>
              {list}
          </ol>
          
        </body>
      </html>
    );
  }
}

module.exports = Home;
