var React = require('react');
var Default = require('./default')
var Form = require('./form')

class Edit extends React.Component {
    render() {
        return (
            <Default>
                <Form artist={this.props.artist}/>
            </Default>
        );
    }
}

module.exports = Edit;
