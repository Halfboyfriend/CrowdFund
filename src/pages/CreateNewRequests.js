import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Message } from "semantic-ui-react";
import connectWallet from "../etherFactory";
import campaignAbi from "../constants/projectCampaign";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function CreateNewRequests() {
  const params = useParams();
  const contractAddress = params.contract;
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading]  = useState(false);
  const [msg, setMsg] = useState('')

  useEffect(() => {}, []);

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true)
    setMsg( <Message info>
      <Message.Header>Creating a new spending request</Message.Header>
      <p>Kindly confirm your transaction</p>
    </Message>)
    try {
      const { provider, signer } = await connectWallet();
      const weiValue = ethers.utils.parseEther(value);
      const Campaign = new ethers.Contract(
        contractAddress,
        campaignAbi,
        provider
      );
      await Campaign.connect(signer).createRequest(desc, weiValue.toString(), address);
      setLoading(false)
      setMsg( <Message info>
        <Message.Header>Request created successfully</Message.Header>
        <p>Congratullations!!, You now have a new spending request</p>
      </Message>)

    } catch (err) {
        Swal.fire({
            text: `${err.message}`,
            icon: "info",
            padding: "3em",
            color: "#716add",
            backdrop: `rgba(0,0,0,0.8)`,
        });
        setLoading(false)
        setMsg( <Message error>
          <Message.Header>Error while creating a request</Message.Header>
          <p>Please try again</p>
        </Message>)
    }
  }

  return (
    <Layout>
      <h2>Create a new Request for this {params.contract} </h2>
      <Link to={`/campaigns/${contractAddress}/requests`}>
        <Button primary  content="back" style={{marginBottom: "20px"}} />
      </Link>
      {msg ? msg : ''}
      <Form onSubmit={submitForm}>
        <Form.Field>
          <label>Description</label>
          <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Amount of ether</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Receipient Address</label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Field>

        <Button primary content="Create!" loading={loading} />
      </Form>
    </Layout>
  );
}

export default CreateNewRequests;
