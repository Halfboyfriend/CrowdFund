import React, { Component } from "react";
import Layout from "../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Swal from "sweetalert2";
import connectWallet from "../etherFactory";
import './Home.css'
import { Link } from "react-router-dom";

class Campaigns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minimumValue: "",
      loading: false,
      message: "",
    };
  }

  submitForm = async (e) => {
    e.preventDefault();

    try {
      const { minimumValue } = this.state;
      const { instance, signer } = await connectWallet();
      this.setState({
        loading: true,
        message: (
          <Message info>
            <Message.Header>Creating Your campaign contract</Message.Header>
            <p>Kindly confirm your transaction</p>
          </Message>
        ),
      });
      await instance.connect(signer).createCampaign(minimumValue);

      this.setState({
        message: (
          <Message info>
            <Message.Header>
              Your Campaign Contract has been successfully created
            </Message.Header>
            <p>Please go back to home page to view your campaign.</p>
          </Message>
        ),
      });
    } catch (err) {
      Swal.fire({
        text: `${err.message}`,
        icon: "info",
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
      <div>
        <Layout>
          <h2 id="text-header">Create a Campaign</h2>
          <Link to={'/'}>
        <Button primary  content="back"/>
      </Link>
          {message ? message : ""}
          <Form onSubmit={this.submitForm}>
            <Form.Field>
              <label>Minimum Contribution (Make sure its greater than 100wei)</label>
              <Input
                label="wei"
                labelPosition="right"
                value={this.state.minimumValue}
                onChange={(e) =>
                  this.setState({ minimumValue: e.target.value })
                }
              />
            </Form.Field>
            <Button
              type="submit"
              primary
              content="Create!"
              onClick={this.submitForm}
              loading={this.state.loading}
            />
          </Form>
        </Layout>
      </div>
    );
  }
}

export default Campaigns;
