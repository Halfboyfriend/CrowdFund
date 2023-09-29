import "./App.css";
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import CampaignDetails from "./pages/CampaignDetails"
import ViewRequest from "./pages/ViewRequest";
import CreateNewRequests from "./pages/CreateNewRequests";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/campaigns/new" element={<Campaigns/>}/>
          <Route path="/campaigns/:contract" element={<CampaignDetails/>}/>
          <Route path="/campaigns/:contract/requests" element={<ViewRequest/>}/>
          <Route path="/campaigns/:contract/requests/new" element={<CreateNewRequests/>}/>


        </Routes>
      </div>
    </Router>
  );
}

export default App;
