var React = require('react');
class Deletepage extends React.Component {
render() {
let url = "/artists/" + this.props.rows[0].id + "?_method=DELETE";
return (
<html>
    <head>
        <title>Delete {this.props.rows[0].name}</title>
        <link href="https://fonts.googleapis.com/css?family=Darker+Grotesque:400,600&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/style.css"/>
    </head>
    <header>
        <h1 className="solo-artist">Delete {this.props.rows[0].name}?</h1>
    </header>
    <body>
        <div className = "edit-artist">
            <img src= {this.props.rows[0].photo_url}/>
            <form action={url} method="POST" className = "form-container">
                    <h2>Name</h2>
                    <input type="number" name="name" defaultValue={this.props.rows[0].name} readOnly/>
                    <h2>Artist Image</h2>
                    <input type="text" name="photo_url" defaultValue={this.props.rows[0].photo_url} readOnly/>
                    <h2>Nationality</h2>
                    <input type="text" name="nationality" defaultValue={this.props.rows[0].nationality} readOnly/>
                    <br/><br/>
                <input type="submit"/>
            </form>
        </div>
    </body>
</html>
);
}
}
module.exports = Deletepage;