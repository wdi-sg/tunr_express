const React = require('react');
const Layout = require('./layout')

class New extends React.Component{
    render(){

        return(
                <Layout>
                    <h1>ADD AN ARTIST</h1>
                  <form method="POST" action={"/"}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input className="form-control form-control-lg" type="text" name="name" required/>

                    </div>
                   <div className="form-group">
                        <label>Photo:  </label>
                        <input className="form-control form-control-lg" type="text" name="photo" required/>
                      </div>
                      <div className="form-group">
                        <label>Nationality:  </label>
                        <input className="form-control form-control-lg" type="text" name="nationality" required/>
                      </div>


                    <input type="submit" className="btn btn-primary btn-block" value="Submit"/>
                </form>

            </Layout>
            )
    }
}
module.exports = New;