var React = require("react");
var DefaultLayout = require('./layouts/default');
// var artistCard = require('./components/artistCard');

class Home extends React.Component {
  render() {


      return (
        <DefaultLayout>
        This text is from home.jsx
        <div className="alert alert-primary" role="alert">
        This is a primary alert—check it out!
        </div>

        <div className="card" style={{width: '18rem'}}>
          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        </DefaultLayout>
    )

  }
}

module.exports = Home


// style={{marginRight: spacing + 'em'}}