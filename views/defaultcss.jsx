var React = require('react');
import React, { Component } from 'react';

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <link href="https://fonts.googleapis.com/css?family=ZCOOL+KuaiLe" rel="stylesheet" />
        <title>Tunr</title>
        </head>
        <header>

        </header>
        <body className="container-fluid">
        <nav>
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <a className="nav-link text-info" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-info" href="/new">Create song</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-info" href="/">Artists</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Contact</a>
              </li>
            </ul>
        </nav>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {this.props.children}
                </div>
              </div>
            </div>
        <footer className="sticky-bottom">
            Copyright 2019 <span> </span>
            Created with &hearts; by <span>Sean Chan</span><span> </span>
            Github: @https://github.com/seany94
        </footer>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;