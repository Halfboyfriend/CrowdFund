import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import formatter from "../utils/settings";
import { ethers } from "ethers";
import connectWallet from "../etherFactory";
import campaignAbi from "../constants/projectCampaign";
import Swal from "sweetalert2";

class RequestRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingF: false,
    };
  }
  approveRequest = async () => {
    const { id, address } = this.props;
    this.setState({loading: true})
    
    try {
      const { provider, signer } = await connectWallet();
      const CampaignContract = new ethers.Contract(
        address,
        campaignAbi,
        provider
      );
      await CampaignContract.connect(signer).approveRequest(id);

      Swal.fire({
        text: "Your Approve request was successfull",
        icon: "info",
        padding: "3em",
        color: "#716add",
        backdrop: `rgba(0,0,0,0.8)`,
      });
      this.setState({ loading: false });
      
    } catch (err) {
      Swal.fire({
        text: `Manager cant approve a request ===> ${err.message}`,
        icon: "error",
        padding: "3em",
        color: "#716add",
        backdrop: `rgba(0,0,0,0.8)`,
      });
      this.setState({ loading: false });
    }
  };

  finalizeRequest = async() => {
    const { id, address } = this.props;
    this.setState({loadingF: true})
    try {
      const { provider, signer } = await connectWallet();
      const CampaignContract = new ethers.Contract(
        address,
        campaignAbi,
        provider
      );
      await CampaignContract.connect(signer).finalizeRequest(id);
      Swal.fire({
        text: "Your Request to Finalize this request was successfull",
        icon: "info",
        padding: "3em",
        color: "#716add",
        backdrop: `rgba(0,0,0,0.8)`,
      });
    this.setState({loadingF: false});

    } catch (err) {
      Swal.fire({
        text: `Only manager can finalize a request ===> ${err.message}`,
        icon: "error",
        padding: "3em",
        color: "#716add",
        backdrop: `rgba(0,0,0,0.8)`,
      });
      this.setState({ loadingF: false });
    }

  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approval } = this.props;
    const readyToFinalize = request.approvalCount.toNumber() > approval / 2;
    return (
   
         <Row disabled={request.complete} positive={readyToFinalize}>
        <Cell> {id + 1} </Cell>
        <Cell> {request.description} </Cell>
        <Cell> {ethers.utils.formatEther(request.amount.toNumber())} </Cell>
        <Cell> {formatter(request.recipient)} </Cell>
        <Cell>
          {" "}
          {request.approvalCount.toNumber()} / {approval}{" "}
        </Cell>
        <Cell>
          {request.complete ? <Button content="completed" primary /> :  <Button
            color="green"
            content="Approve"
            onClick={this.approveRequest}
            loading={this.state.loading}
          />}
         
        </Cell>
        <Cell>
          {request.complete ? <Button content="completed" primary /> : <Button
            color="red"
            content="Finalize"
            onClick={this.finalizeRequest}
            loading={this.state.loadingF}
          />}
         
        </Cell>


      </Row>
      
    );
  }
}

export default RequestRow;
