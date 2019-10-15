var React = require("react");

class Delete extends React.Component {
  render() {

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
            <div className="container text-center mt-5">
            <h1>You are about to delete {this.props.result.name}</h1>
          <h2>Are you sure?</h2>

          <form className="pt-3" method="POST" action={"/artists/" + this.props.result.id + '?_method=delete'}>
         <div className=" text-center well d-flex justify-content-around justify-content-center mt-5 " style={{width: "300px", margin:"0 auto"}}>
         <button class="btn btn-danger btn-lg" type="submit" value="Confirm">Confirm</button>
        <button class="btn btn-info btn-lg" ><a className="text-white" href="/artists">Back To Home</a></button>
           </div>
        
         </form>
            </div>
         
       
        </body>
      </html>
    );
  }
}

module.exports = Delete;
