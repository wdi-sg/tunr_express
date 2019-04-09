var React = require("react");

class Head extends React.Component{
    render(){
        return(
            <head>
                <meta charSet="utf-8"/>
                <title>TUNR EXPRESS</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link rel="stylesheet" href="/style.css"/>
            </head>
        )
    }
}

class View extends React.Component {
  render() {

    let data = this.props.data
    console.log('in the view artist JSX........:');
    console.log(data);
    let outList = data.map(item=>{
        return  <div class="card-item">
                    <h4>{item.title} {item.album}</h4>
                    <h5>{item.nationality} {item.preview_link}</h5>
                </div>
    })
    return (
      <html>
        <Head/>
        <body>
          <h1>Mildly Comparable Audiophalse</h1>
          <a href='/'>Return to view all artist</a>
          <div class="content">
            {outList}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = View;