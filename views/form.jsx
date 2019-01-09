var React = require('react');

class Form extends React.Component {
    render() {
        let action;
        this.props.artist ? action = '/artists/' + this.props.artist.id + "/put?_method=PUT" : action = '/artists/new';
        return (
            <form method='POST' action={action}>
                <input type='text' name='name' placeholder='Artist name' defaultValue={this.props.artist.name}/>
                <input type='text' name='photo_url' placeholder='Photo URL' defaultValue={this.props.artist.photo_url}/>
                <input type='text' name='nationality' placeholder='Nationality' defaultValue={this.props.artist.nationality}/>
                <input type='submit' value='Submit'/>
            </form>
        );
    }
}

module.exports = Form;
