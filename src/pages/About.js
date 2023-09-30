import React, { Component } from "react";
import Layout from "../components/Layout";
import { Embed, Header, Container } from "semantic-ui-react";

class About extends Component {
  render() {
    return (
      <Layout>
        <div>
          <Header
            as="h2"
            question
            circle
            style={{ marginTop: "25px", textAlign: "center" }}
          >
            How does CrowdFund works?
          </Header>

          <p>
            CrowdFund is a platform designed to provide solutions and financial
            support for project initiatives. It operates as a community where
            users with project ideas, project-related challenges, or funding
            requirements can create campaigns to secure financial backing.
          </p>

          <Container>
            <Embed
              autoplay={false}
              brandedUI
              color="white"
              iframe={{
                allowFullScreen: false,
                style: {
                  padding: 10,
                },
              }}
              hd={false}
              id="D0WnZyxp_Wo"
              placeholder="/images/image-16by9.png"
              source="youtube"
            />
          </Container>

          <Header as="h3">Creating a Campaign</Header>
          <p>
            To initiate a funding campaign, a user can create one for their
            project. During the campaign setup, the user must specify the
            minimum contribution amount in wei that they wish to receive from
            participants. We recommend setting a minimum of 100 wei, equivalent
            to $0.000001. Upon campaign creation, a contract is generated and
            deployed on behalf of the user, making them the designated manager
            of the contract.
          </p>

          <Header as="h3">Contributing to a Campaign</Header>
          <p>
            Anyone can participate in an active campaign by contributing funds.
            Users interested in contributing should specify the amount they want
            to contribute in Ether. It's important to ensure that the
            contribution amount is equal to or greater than the specified
            minimum contribution to avoid transaction failures. Once the desired
            amount is input, users can click the "Contribute" button and confirm
            the transaction through their wallet.
          </p>

          <Header as="h3">Creating a Spending Request</Header>
          <p>
            To access funds from the contract, the manager must create a
            spending request, which should not exceed the balance available in
            the contract. During the request creation, the manager must provide
            clear and specific details about how the funds will be utilized,
            including the amount to be spent and the recipient's wallet address.
          </p>

          <Header as="h3">Request Approval</Header>
          <p>
            Approval of a spending request is required before the manager can
            access the funds. Only contributors to the campaign have the
            authority to approve or deny the manager's request. A minimum of 50%
            of contributors must approve the manager's spending request to grant
            access to the funds. Contributors have the option to withhold
            approval if they believe the request is not justified, preventing
            the manager from accessing the funds.
          </p>

          <Header as="h3">Finalizing a Request</Header>
          <p>
            Once at least 50% of contributors have approved the manager's
            request, the manager can proceed to finalize the spending request.
            At this point, the funds are transferred to the designated
            recipient's account, and the spending request is marked as
            "COMPLETED."
          </p>
        </div>
      </Layout>
    );
  }
}

export default About;
