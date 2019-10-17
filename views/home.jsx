var React = require("react");
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
   render() {

        let style = {
            display: "inline-block",
            margin: "2rem",
            "text-align": "center"
        }
        let style2 = {
            "text-decoration": "none"
        }
        const allArtists = this.props.artistsobj.map( (artists, index) => {
            return (
                <li style={style}><img src={artists.photo_url} width="175px"/><br/>
                <a style={style2} href={"/artists/"+(index+1)} className="list-group-item list-group-item-action list-group-item-primary">{artists.name}</a>
                <br/>
                <a href={"/artists/"+(index+1)+"/edit"} className="btn btn-sm btn-outline-info m-1">Edit</a>
                <a href={"/artists/"+(index+1)+"/delete"} className="btn btn-sm btn-outline-danger m-1">Delete</a>
                </li>
                )

        })
        return (

          <DefaultLayout pageTitle="Main Page">



                  { this.props.warning }
                        <ul>
                        {allArtists}
                        </ul>


          </DefaultLayout>
        )
    }
}


module.exports = Home;
