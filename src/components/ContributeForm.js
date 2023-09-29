import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import connectWallet from "../etherFactory";
import campaignAbi from "../constants/projectCampaign";
import { ethers } from "ethers";
import Swal from "sweetalert2";

class ContributeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      loading: false,
      message: "",
    };
  }

  submitForm = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    try {
      const contractAddress = this.props.address;
      const amount = ethers.utils.parseEther(this.state.value.toString());

      this.setState({
        loading: true,
        message: (
          <Message info>
            <Message.Header>
              Your transaction has been sent and pending
            </Message.Header>
            <p>Kindly confirm your transaction</p>
          </Message>
        ),
      });
      const { provider, signer } = await connectWallet();
      const Campaign = new ethers.Contract(
        contractAddress,
        campaignAbi,
        provider
      );
      await Campaign.connect(signer).contribute({ value: amount.toString() });
      this.setState({
        message: (
          <Message info>
            <Message.Header>Transaction Success</Message.Header>
            <p>
              Congratulations!!!, you have successfully contributed to this
              campaign.
            </p>
          </Message>
        ),
      });
    } catch (err) {
      Swal.fire({
        text: `${err.message}`,
        icon: "error",
        padding: "3em",
        color: "#716add",
        backdrop: `rgba(0,0,0,0.8)`,
      });
      this.setState({ message: "" });
    }

    this.setState({ loading: false });
  };

  render() {
    const { message } = this.state;
    return (
      <Form onSubmit={this.submitForm}>
        {message ? message : ""}
        <Form.Field>
          <label>Amount to Contibute</label>

          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
        </Form.Field>

        <Button
          loading={this.state.loading}
          type="submit"
          primary
          content="Contribute!"
        />
      </Form>
    );
  }
}

export default ContributeForm;
