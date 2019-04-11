// var React = require("react");

// class Home extends React.Component {
//   render() {
//     return (
//       <html>
//         <head />
//         <body>
//           <h1>Welcome!</h1>
//         </body>
//       </html>
//     );
//   }
// }

// module.exports = Home;

var React = require("react");


// class New extends React.Component{
//     render(){




//         return(


//         )
//     }
// }


class Home extends React.Component {
  render(){
    console.log("at jsx:");
    // console.log(this.props.requestedQuery[0].id);
    // console.log (this.props.requestedQueryAll);

    // let showDataAll = (this.props.requestedQueryAll.map(artists) => {
    //     return <p> {artists} </p>
    // });

    let showData = (this.props.requestedQuery[0]);
    let id = showData.id;
    let name =showData.name;
    let photo = showData.photo_url;
    let nationality = showData.nationality;

    return (
      <html>
        <head>
            <title>Tunr 1.0</title>
        </head>
        <body>
            <h1>Tunr 1.0 Database</h1>
            <div className="displayContainer">
                {id}
                <br></br>
                {name}
                <br></br>
                {photo}
                <br></br>
                {nationality}
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;