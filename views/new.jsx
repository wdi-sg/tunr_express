const React = require('react');

class New extends React.Component {
    render() {

        return(
            <html>
             <body>
                <div>
                    <h1>New Artists Registration</h1>
                    <form action="/artists/" method="post" id="new">

                        <div>
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="name" />
                        </div>
                        <div>
                            <label htmlFor="photo_url">Photo_url: </label>
                            <input type="text" name="photo_url" />
                        </div>
                        <div>
                            <label htmlFor="nationality">nationality: </label>
                            <input type="text" name="nationality" />
                        </div>
                    </form>
                    <button type="submit" form="new" value="submit">
                        Submit
                    </button>
                </div>
             </body>
            </html>
            )}
    }



module.exports = New;