const React = require('react');

class Showall extends React.Component {
    render() {
        console.log(this.props.artists)
            var everything = this.props.artists.map(x=>(
            <div class="card" style={{width: "18rem"}}>
                    <img class="card-img-top" src="" alt="Card image cap"/>
                    <div class="card-body">
                    <h5 class="card-title">{x.name}</h5>
                    <p class="card-text">{x.nationality}</p>
                    </div>
              </div>
              ));

        return(
             <html>
        <head>

        </head>
        <body>
​
        <main>
          <div>
              <h1 className="col-md-auto display-4">This Is All The Artists!</h1>
              {everything}


          </div>
        </main>

        </body>
      </html>
            )}
    }



module.exports = Showall;