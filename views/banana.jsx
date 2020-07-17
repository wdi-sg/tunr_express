var React = require("react");
var Layout = require ('./layout')


class Banana extends React.Component {

  render() {


    return (
     <Layout>
         <div className="d-flex justify-content-center">
         <img src="https://78.media.tumblr.com/3217d9861efea2f57efd52f05c768a6c/tumblr_pafha13Qdv1qkz08qo1_540.gif" style={{width: "100%"}}/></div>
         <div className="d-flex justify-content-center">
            <h3>Hooray! You've accessed the super secret area!</h3>
        </div>
    </Layout>

    );
  }
}

module.exports = Banana;