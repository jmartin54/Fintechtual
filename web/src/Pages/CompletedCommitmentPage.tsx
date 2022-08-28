import { sequence } from "0xsequence";
import { Contract } from "ethers";
import { useState, useCallback } from "react";
import { address } from "../Constants";
const GymBountyArtifact = require("../GymBounty.json");

export default function CompletedCommitmentPage() {
  const [loading, setLoading] = useState(false);

  const withdraw = useCallback(() => {
    setLoading(true);
    (async () => {
      const { abi } = GymBountyArtifact;
      const wallet = sequence.getWallet();
      const signer = wallet.getSigner();

      const contract = new Contract(address, abi, signer);

      await contract.withdraw();

      setLoading(false);
    })();
  }, []);
  return (
    <div>
      <h1>Completed your commitment</h1>
      {!loading && <button onClick={withdraw}>withdraw funds</button>}
      {loading && <p>loading...</p>}
    </div>
  );
}
