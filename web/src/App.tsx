import { sequence } from "0xsequence";
import { useCallback, useState } from "react";
import "./App.css";
import LoadAccountInfo from "./LoadAccountInfo";
import LandingPage from "./Pages/LandingPage";
import WrongNetworkPage from "./WrongNetworkPage";

function App() {
  const [connection, setConnection] =
    useState<sequence.provider.ConnectDetails | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = useCallback(() => {
    (async () => {
      const wallet = await sequence.initWallet("mumbai");
      const connectDetails = await wallet.connect();
      console.log(connectDetails);
      setConnection(connectDetails);
      const walletAddress = await wallet.getAddress();
      setAddress(walletAddress);
    })();
  }, []);

  const openWallet = useCallback(() => {
    (async () => {
      const wallet = sequence.getWallet();
      await wallet.openWallet();

      setConnection(null);
    })();
  }, []);

  return (
    <div className="App">
      {connection == null && <LandingPage onClickConnect={connectWallet} />}
      {connection != null && connection.chainId !== "0x013881" && (
        <WrongNetworkPage onClickOpenWallet={openWallet} />
      )}
      {connection != null && connection.chainId == "0x013881" && (
        <LoadAccountInfo
          walletAddress={address ?? ""}
          onLogout={() => setConnection(null)}
        />
      )}
    </div>
  );
}

export default App;
