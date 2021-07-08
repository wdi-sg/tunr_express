var React = require('react');
var Layout = require("./layout");

class Delete extends React.Component {

  render() {
     const actionAttribute = `/artist/${this.props.artistId[0].id}?_method=DELETE`;
     console.log("Printing out action delete attribute: "+actionAttribute);
     let id = this.props.artistId[0].id;
     let name = this.props.artistId[0].name;
     let photo = this.props.artistId[0].photo_url;
     let nationality = this.props.artistId[0].nationality;
     return(
       <Layout title = "Delete Artist">
       <div>
       <a href='/'>Return to view all artists</a>
         <div className="card" stylename ={"width: 18rem;"}>
         <img className ="card-img-top" src = {photo} alt= "Artist's image"/>
           <div className = "card-body">
             <a href={`/artist/${id}`}>
               <h4 className = "card-title">{name}</h4>
             </a>
         <h5>Nationality: {nationality}</h5>
           </div>
         </div>
       </div>
        <form method = "POST" action = {actionAttribute}>
          <p>Are you sure you want to delete this artist?</p>
          <input type = "submit" value = "Delete"/>
        </form>
        </Layout>
      );
    }
}

module.exports = Delete;
