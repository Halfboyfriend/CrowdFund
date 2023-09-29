import React, { Component } from "react";
import connectWallet from "../etherFactory";
import formatter from "../utils/settings";
import "./Navbar.css";
import { Button, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instance: null,
      connectedAddress: null,
    };
  }
  async componentDidMount() {
    const { userAddress, instance } = await connectWallet();
    console.log(userAddress);
    this.setState({ instance: instance, connectedAddress: userAddress });
  }

  connection = async () => {
    await connectWallet();
  };

  render() {
    const { connectedAddress } = this.state;
    return (
      <React.Fragment>
        <Navbar
          expand="md"
          bg="dark"
          variant="dark"
          className="justify-content-between p-3"
        >
          <Navbar.Brand>
            <NavLink to="/" className="navbar-brand">
              <span id="navbar__brand">CrowdFund</span>
            </NavLink>
          </Navbar.Brand>

          <Navbar.Collapse id="navbar-nav">
            <Nav className="m-auto">
              <Nav.Item>
                <NavLink to="/" className="link nav-link">
                  Home
                </NavLink>
              </Nav.Item>

              <Nav.Item>
                <NavLink to="/campaigns/new" className="link nav-link">
                  Campaign
                </NavLink>
              </Nav.Item>

              <Nav.Item>
                <NavLink to="/about" className="link nav-link">
                  About
                </NavLink>
              </Nav.Item>

              <Nav.Item>
                <NavLink to="/contact" className="link nav-link">
                  Contact
                </NavLink>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          {connectedAddress ? (
            <Button onClick={this.connection}>
              {formatter(connectedAddress)}
            </Button>
          ) : (
            <Button onClick={this.connection}>connect</Button>
          )}

          <Navbar.Toggle aria-controls="navbar-nav" />
        </Navbar>

        <Container>{this.props.children}</Container>
      </React.Fragment>
    );
  }
}

export default Layout;
