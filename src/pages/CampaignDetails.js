import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import connectWallet from "../etherFactory";
import campaignAbi from "../constants/projectCampaign";
import { Card, Grid, Button } from "semantic-ui-react";
import ContributeForm from "../components/ContributeForm";
import { Link } from "react-router-dom";
import './Home.css'

function CampaignDetails() {
  const [manager, setManger] = useState("");
  const [balance, setBalance] = useState("");
  const [minimum, setMinimum] = useState("");
  const [requestCount, setRequests] = useState("");
  const [approvals, setApprovals] = useState("");

  const params = useParams();
  const contractAddress = params.contract;

  async function getContract() {
    try {
      const { provider } = await connectWallet();
      const Campaign = new ethers.Contract(
        contractAddress,
        campaignAbi,
        provider
      );
      const summary = await Campaign.getContractSummary();
      const contractBalance = ethers.utils.formatEther(summary[3]);
      const manager = summary[4];
      const minimum = summary[0].toNumber();
      const requestCount = summary[1].toNumber();
      const approvals = summary[2].toNumber();

      setManger(manager);
      setBalance(contractBalance);
      setMinimum(minimum);
      setApprovals(approvals);
      setRequests(requestCount);
    } catch (err) {
      console.log(err);
    }
  }
  const items = [
    {
      header: manager,
      description: "This is the address of the manager of this campaign",
      meta: "Manger Address",
      style: { overflowWrap: "break-word" },
    },
    {
      header: balance,
      description: "This is balance of the campaign",
      meta: "Campaign Balance(eth)",
    },
    {
      header: minimum,
      description: "This is the minimum you can contibute to this campaign",
      meta: "Minimum Contribution(wei)",
    },
    {
      header: requestCount,
      description:
        "A requests tries to withdraw money from the contract. Request must be approved by approvals",
      meta: "Total Number of Requests",
    },
    {
      header: approvals,
      description:
        "Total number of people who have donated to this campaign, and they can approve manager's spending request",
      meta: "Total Approvals",
    },
  ];

  useEffect(() => {
    getContract();
  }, []);

  return (
    <div>
      <Layout>
        <h2 id="text-header">Campaign Contract Details</h2>
        <Link to={`/`}>
        <Button primary  content="back" style={{marginBottom: "20px"}} />
      </Link>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Card.Group items={items} />
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={contractAddress} minimum={minimum} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
            <Link to={`/campaigns/${contractAddress}/requests`}>
              <Button primary content="View Requests" />
            </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    </div>
  );
}

export default CampaignDetails;
