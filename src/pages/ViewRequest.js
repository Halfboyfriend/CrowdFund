import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import connectWallet from "../etherFactory";
import { ethers } from "ethers";
import campaignAbi from "../constants/projectCampaign";
import formatter from "../utils/settings";
import RequestRow from "../components/RequestRow";
import "./Home.css";

function ViewRequest() {
  const params = useParams();
  const contractAddress = params.contract;
  const [approve, setApprove] = useState("");
  const [count, setCount] = useState(null);
  const getRequests = async () => {
    const { provider } = await connectWallet();
    const Contract = new ethers.Contract(
      contractAddress,
      campaignAbi,
      provider
    );
    const requestCount = await Contract.requestCount();
    setCount(requestCount.toNumber())
    const approval = await Contract.listApprovers();
    setApprove(approval.toNumber());

    const Requests = await Contract.getRequests();
    console.log(Requests);
    return Requests;
  };
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const Requests = await getRequests();
      setRequests(Requests);
    };
    fetchData();
  }, []);

  const renderRow = (requests) => {
    return requests.map((req, index) => (
      <RequestRow
        request={req}
        id={index}
        key={index}
        address={contractAddress}
        approval={approve}
      />
    ));
  };

  const { Header, Body, Row, HeaderCell, Cell } = Table;
  return (
    <Layout>
      <h2 id="text-header">
        All pending requests of {formatter(contractAddress)} Campaign{" "}
      </h2>
      <Link to={`/campaigns/${contractAddress}`}>
        <Button primary content="back" />
      </Link>
      <Link to={`/campaigns/${contractAddress}/requests/new`}>
        <Button
          primary
          floated="right"
          content="Create Request"
          style={{ marginBottom: "20px" }}
        />
      </Link>
      <br />
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
        {count > 0 ? renderRow(requests) : <p className="text-center">NO REQUEST YET</p> }
        
        </Body>
      </Table>

    </Layout>
  );
}

export default ViewRequest;
