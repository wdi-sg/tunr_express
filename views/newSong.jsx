var React = require('react');
var Default = require('./default')

class NewSong extends React.Component {
    render() {
        let action = '/artists/' + this.props.id + '/songs/new';
        return (
            <Default>
                <form method='POST' action={action}>
                    <input type='text' name='title' placeholder='Title'/>
                    <input type='text' name='album' placeholder='Album'/>
                    <input type='text' name='preview_link' placeholder='Preview URL'/>
                    <input type='text' name='artwork' placeholder='Artwork URL'/>
                    <input type='submit' value='Submit'/>
                </form>
            </Default>
        );
    }
}

module.exports = NewSong;
