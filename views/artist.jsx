const React = require('react');

export default class Artist extends React.Component {
    render(){
        const {id, name, photo_url, nationality} = this.props;

        return (
        <html>
        <body>
          <div>
            <h1>Artist Profile</h1>
            <h2>Name:{name}</h2>
            <h2>Nationality:{nationality}</h2>
            <img src={photo_url}/>

          </div>
        </body>
      </html>
            );
    }
}