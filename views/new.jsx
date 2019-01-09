var React = require('react');
var Default = require('./default')

class New extends React.Component {
    render() {
        return (
            <Default>
                <form method='POST' action='/artists/new'>
                    <input type='text' name='name' placeholder='Artist name'/>
                    <input type='text' name='photo_url' placeholder='Photo URL'/>
                    <input type='text' name='nationality' placeholder='Nationality'/>
                    <input type='submit' value='edit'/>
                </form>
            </Default>
        );
    }
}

module.exports = New;
