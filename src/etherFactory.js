import { ethers } from "ethers";
import ABI from "./constants/contract";
import {contractAddress, supportedChain} from "./constants/index";
import Swal from "sweetalert2";

const connectWallet = async () => {
    let userAddress = null; 
    let instance = null;
    let signer = null;
    let provider = null
    if (window.ethereum) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          userAddress = accounts[0];
        })
        .catch((error) => {
          console.error("Error connecting to Metamask:", error);
        });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      instance = new ethers.Contract(contractAddress, ABI, provider);
      signer = provider.getSigner();

      if (!instance) {
        window.alert("Factory contract not detected on the selected network");
      }
      const networkId = (await provider.getNetwork()).chainId;
      if (networkId !== supportedChain.id){
        Swal.fire({
          text: `Please switch to the ${supportedChain.name} network and connect again`,
          icon: "info",
          padding: "3em",
          color: "#716add",
          backdrop: `rgba(0,0,0,0.8)`,
        });
        await getSupportedNetwork();
      }

    } else {
      Swal.fire({
        text: `Metamask Not Found, Please install metamask extension and try again`,
        icon: "error",
        padding: "3em",
        color: "#716add",
        backdrop: `rgba(0,0,0,0.8)`,
      });
    }
    return {userAddress, instance, signer, provider};
};

const getSupportedNetwork = async() =>{
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `${supportedChain.idString}` }],
    });
  } catch (error) {
    if (error.code === 4902) {
      await addSupportedNetwork();
    }
  }
}
const addSupportedNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `${supportedChain.idString}`,
          chainName: `${supportedChain.name}`,
          rpcUrls: [supportedChain.rpcUrl],
          blockExplorerUrls: [supportedChain.explorerUrl],
          nativeCurrency: supportedChain.nativeCurrency,
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
};


export default connectWallet