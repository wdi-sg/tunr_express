var React = require('react');
class Editpage extends React.Component {
render() {
let url = "/artists/" + this.props.rows[0].id + "?_method=PUT";
return (
<html>
    <head>
        <title>Edit {this.props.rows[0].name}</title>
        <link href="https://fonts.googleapis.com/css?family=Darker+Grotesque:400,600&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/style.css"/>
    </head>
    <body>
        <div className = "edit-artist">
            <h1>Edit Artist: {this.props.rows[0].name}</h1>
            <img src= {this.props.rows[0].photo_url}/>
            <form action={url} method="POST" className = "form-container">
                <h2>Name</h2>
                <input type="text" name="name" defaultValue={this.props.rows[0].name}/>
                <h2>Image Source</h2>
                <input type="text" name="photo_url" defaultValue={this.props.rows[0].photo_url}/>
                <h2>Nationality</h2>
                <input type="text" name="nationality" defaultValue={this.props.rows[0].nationality}/>
                <br/>
                <input type="submit"/>
            </form>
        </div>
    </body>
</html>
);
}
}
module.exports = Editpage;