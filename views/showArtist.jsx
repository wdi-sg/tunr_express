var React = require("react");
var DefaultLayout = require('./layouts/default');
class showArtist extends React.Component {
  render() {
         let formUrl= "/artists/"+this.props.id+"?_method=delete";
     let linkEdit= "/artists/"+this.props.id+"/edit";
     let songLink = "/artists/"+this.props.id+"/songs";
    return (
        <DefaultLayout>
        <div className="container h-100">

    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6 ml-5 ">
        <div className="row">
                <h1>{this.props.name}</h1>
                </div>
                <div className="row">
                <div className="container h-100 ">
                <div className="row">
                <div className ="col-md-3">
       <label>Photo URL :  </label></div>
       <div className ="col-md-12">
       <p>{this.props.photo_url}</p>
       </div>
</div>
        <div className="row"><div className ="col-md-3">
                    <label className="mr-4">Nationality : </label></div>
                    <div className ="col-md-12">
            <p>{this.props.nationality}</p>
            </div>

                    <br/>
                    </div>
                </div>
                 </div>
                <div className="d-flex flex-row-reverse">
               <form  method="POST" action={formUrl}>
                <button type="submit" className="btn btn-danger btn-customized align-self-end">Delete</button>
                </form>
               <a className="btn btn-primary mr-1" href={linkEdit}>Edit</a>
              <a className="btn btn-primary mr-1" href={songLink}>Songs</a>
        </div>
    </div>
</div>
</div>
        </DefaultLayout>
    );
  }
}

module.exports = showArtist;