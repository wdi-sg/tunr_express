const React = require('react');

class New extends React.Component{
    render(){

        return(
            <html>

                <body>
                  <div>
                    <h1>ADD AN ARTIST</h1>
                    <form action={"/artists/"} method="post" id="new">
                      <div>
                        <label>Name  </label>
                        <input type="text" name="name" required/>
                      </div>
                      <div>
                        <label>Photo:  </label>
                        <input type="text" name="photo" required/>
                      </div>
                      <div>
                        <label>Nationality:  </label>
                        <input type="text" name="nationality" required/>
                      </div>

                    </form>
                    <button type="submit" form="new" value="submit">
                        Submit
                    </button>

                    <div className = "new">
                    </div>

                  </div>
                </body>
              </html>
            )
    }
}
module.exports = New;