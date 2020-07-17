const React = require('react');

class editArtist extends React.Component {
    render() {

        return (
            <html>
             <body>
                <div>
                    <h1>Edit {this.props.name} Contents </h1>
                   <form action={"/artists/"+this.props.id+'?_method=put'} method="POST">

                        <div>
                            <h3>Name</h3>
                             <input type="text" name="name" defaultValue={this.props.name}/>
                            <h3>Photo_url</h3>
                            <input type="text" name="photo_url" defaultValue={this.props.photo_url}/>
                              <h3>Nationality :</h3>
                    <input type="text" name="nationality" defaultValue={this.props.nationality}/>
                        </div>
                        <p>
                    <input type="submit"/>
                    </p>
                    </form>
                </div>
             </body>
            </html>
            )}
    }


module.exports = editArtist;