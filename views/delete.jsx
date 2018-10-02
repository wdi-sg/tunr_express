const React = require('react');

class Delete extends React.Component {

    render() {

        let url = "/?_method=delete";

        let allArtist = this.props.result.map((element) => {

            return <div><input type="radio" name="id" value={element.id} /> {element.name}</div>

        });

        return(

            <html>
                <head />
                <body>
                    <form method="POST" action={url}>
                        {allArtist}
                        <input type="submit" value="Submit"/>
                    </form>
                </body>
            </html>
    )};
};

module.exports = Delete;