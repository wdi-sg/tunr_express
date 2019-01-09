var React = require("react");
var DefaultLayout = require('./layouts/default');


class Home extends React.Component {
  render() {
    let artists = this.props.rows.map(element => {
            return (
                <div className="list-group list-group-flush">
                  <a href={'/artists/' + element.id} className="list-group-item list-group-item-action">
                    <p>{element.name}</p>
                  </a>
                </div>
            )
        })


    return (

    <DefaultLayout>
        <body>
            <h3 className="h6">Artists</h3>
            {artists}
        </body>
    </DefaultLayout>
    )

  }
}

module.exports = Home;
