var React = require("react");

class New extends React.Component {
  render() {
    
              const name =this.props.rows.map((title,index)=>{
                            return <p>{index+1} {title.title}</p>

              });
    return (
      <html>
        <head/>
        <body>
          <h3>{name}</h3>
        </body>
      </html>
    );
  }
}

module.exports = New;
