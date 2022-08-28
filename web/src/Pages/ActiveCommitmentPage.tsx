import { useCallback, useState } from "react";
import Commitment from "../Models/Commitment";
import { address } from "../Constants";
import { sequence } from "0xsequence";
import { Contract } from "ethers";
const GymBountyArtifact = require("../GymBounty.json");

type ActiveCommitmentPageProps = {
  todaysCommitment: Commitment;
  tomorrowsCommitment: Commitment;
  onCheckin: () => void;
};
export default function ActiveCommitmentPage({
  todaysCommitment,
  tomorrowsCommitment,
  onCheckin,
}: ActiveCommitmentPageProps) {
  const [loading, setLoading] = useState(false);

  const checkin = useCallback(() => {
    setLoading(true);
    (async () => {
      const { abi } = GymBountyArtifact;
      const wallet = sequence.getWallet();
      const signer = wallet.getSigner();

      const contract = new Contract(address, abi, signer);

      await contract.fullfill();

      onCheckin();
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1>Today</h1>
      <p>Commited: {`${todaysCommitment.commited}`}</p>
      {todaysCommitment.commited && (
        <p>Fullfilled: {`${todaysCommitment.fulfilled}`}</p>
      )}
      {todaysCommitment.fulfilled && (
        <p>Paid out: {`${todaysCommitment.claimed}`}</p>
      )}
      {todaysCommitment.commited && !todaysCommitment.fulfilled && (
        <>
          {!loading && <button onClick={checkin}>Checkin to Workout</button>}
          {loading && <p>loading...</p>}
        </>
      )}
      <hr />
      <h1>Tomorrow</h1>
      <strong>Come back at midnight UTC</strong>
      <p>Commited: {`${tomorrowsCommitment.commited}`}</p>
      {tomorrowsCommitment.commited && (
        <p>Fullfilled: {`${tomorrowsCommitment.fulfilled}`}</p>
      )}
      {tomorrowsCommitment.fulfilled && (
        <p>Paid out: {`${tomorrowsCommitment.claimed}`}</p>
      )}
    </div>
  );
}
