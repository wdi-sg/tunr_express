var React = require("react")
var DefaultLayout = require('./layout/default')


class Artist extends React.Component {
    render() {

    let artistname = this.props.artist[0].name;
    let artistimg = this.props.artists[0].photo_url;
    let artistnationality = this.props.artists[0].nationality;
    let url='/artist/'+this.props.artists[0].id+'/edit'
    let deleteURL = '/artist/'+this.props.artists[0].id+'?_method=DELETE';

    return (
           <DefaultLayout title="New Task">

             <h1>{artistname}</h1>
             <img src={artistimg} />
             <p>Nationality: {artistnatonality}</p>
             <button><a href={url}>Edit</a></button>

             <form method = "POST" action ={deleteURL}><input type="submit" value='Delete' class="submit"/></form>



         </DefaultLayout>
     );
   }
 }

 module.exports = Artist;