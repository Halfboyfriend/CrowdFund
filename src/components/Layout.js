import React, { Component } from "react";
import connectWallet from "../etherFactory";
import formatter from "../utils/settings";
import "./Navbar.css";
import { Button, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
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

  connection = async() => {
      await connectWallet();
  }

  render() {
    const { connectedAddress } = this.state;
    return (
      <React.Fragment>
        <nav>
        <Link to={"/"}>
        <span id="navbar__brand">CrowdFund</span>
      </Link>
          
          <div>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/campaigns/new">Campaigns</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
            <div id="nav__btn">
              {connectedAddress ? (
                <Button onClick={this.connection}>
                  {formatter(connectedAddress)}
                </Button>
              ) : (
                <Button onClick={this.connection}>connect</Button>
              )}
            </div>
          </div>
        </nav>

        <Container>{this.props.children}</Container>
        {/* <footer>
          <h2>footer Here</h2>
        </footer> */}
      </React.Fragment>
    );
  }
}

export default Layout;
