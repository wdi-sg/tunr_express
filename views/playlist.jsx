var React = require("react");

class Playlist extends React.Component {
  render() {
    console.log('cookie holder before!****************');
    if (parseInt(this.props.cookies)>=10){
        var cookieHolder = '<img src = https://image.flaticon.com/icons/svg/2826/2826429.svg></img>';
    }
    const plNames = this.props.pl.map(plTitle => {
        return <li>{plTitle.name}</li>
    })
    console.log('cookie holder after!****************');
    console.log(cookieHolder);
    return (
      <html>
        <head />
        <body>
            <div>
                <h1>The playlists are:</h1>
            </div>
            <div>
                <ul>
                    {plNames}
                </ul>
            </div>
            <p>The number of page count is: {this.props.cookie}</p>
            <p>{cookieHolder}</p>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;