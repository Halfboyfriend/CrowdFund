import React, { Component } from "react";
import connectWallet from "../etherFactory";
import { Card, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";
import { Link } from 'react-router-dom';
import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deployedAddress: [],
    };
  }
  async componentDidMount() {
    const { instance } = await connectWallet();
    const deployedAddress = await instance.getDeployedCampaigns();
    this.setState({
      deployedAddress,
    });
  }
  renderCampaigns() {
    const { deployedAddress } = this.state;
    const items = deployedAddress.map((address) => {
      return {
        header: address,
        description: <a href={`/campaigns/${address}`}>View Campaign</a>,
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }
  

  render() {
    const { deployedAddress } = this.state;
    return (
      <React.Fragment>
        <Layout>
        <h2 id="header">Open Campaigns</h2>
        <div className="landingPage">

        <Link to='/campaigns/new'>
         <Button
          content="Create Campaign"
          icon="add circle"
          primary
          style={{marginBottom: "20px"}}
          />
         </Link>
        
          {deployedAddress ? this.renderCampaigns() : "No Campaign"}
        

          <Link to='/about'>
            <a href="/about"> How does it works? </a>
         </Link>
        </div>
        </Layout>

      </React.Fragment>
    );
  }
}

export default Home;
