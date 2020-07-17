var React = require('react');

class Form extends React.Component {
  render() {
    console.log("new")
    return (
      <html>
        <head>
              <link href="https://fonts.googleapis.com/css?family=Dosis|Work+Sans&display=swap" rel="stylesheet"/>

              <link rel="stylesheet" type="text/css" href="/style1.css"/>
          </head>
        <body>
        <header>
            <h1> Artist List</h1>
              <nav>
                <ul>
                  <li><a href="/">All artists</a></li>
                  <li><a href="#">All songs</a></li>
                  <li><a href="#">Search songs</a></li>
                </ul>
              </nav>
          </header>
          <div>
            <h1>Add new artists</h1>
            <form method="POST" action={'/'}>
                
                <div className= "title">
                  <p> Name</p>
                  
                  <div className = "one" ><input name="title" autocomplete = "off" /></div>
                
                </div>
                <div className = "inputImg">
                  <p> Image</p>
                  <div className = "two" ><input name="img" /></div>
                
                </div>
                <div className = "inputIngre">
                  <p>Nationality</p>
                  <div className = "three" ><input name="ingredient" autocomplete = "off" /></div>
                
                </div>
               
                <input type="submit"/>
            </form>
          </div>
          <footer> © 2019 Song-collection GA All rights reserved.</footer>
        </body>
      </html>
    );
  }
}

module.exports = Form;