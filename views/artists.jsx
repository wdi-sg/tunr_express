
import React from 'react'


export default class Artists extends React.Component {
    render(){

    const obj = this.props
    let links =[];

    function renderList() {

    for (var i = 0; i < obj.length; i++) {
        var item = obj[i];
        links.push(<a href={`/artist/${item.id}`}>item.name</a>);
    }
    links.map(link=> {
        return <li>{link}</li> } )}

    let artistList = renderList();

        return (
        <html>
        <body>
          <div>
            <h1>ALL ARTISTS</h1>
            <ul>{artistList}</ul>
          </div>
        </body>
      </html>
            );
    }
}