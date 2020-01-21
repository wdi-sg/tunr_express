const React = require("react");

class Footer extends React.Component {
  render() {
    const author = "TUNR";
    const year = "2020";
    return (
      <footer>
          &copy; {author} {year}
      </footer>
    );
  }
}

module.exports = Footer;