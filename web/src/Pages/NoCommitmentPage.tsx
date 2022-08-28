import { sequence } from "0xsequence";
import { Contract, ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { address } from "../Constants";
const GymBountyArtifact = require("../GymBounty.json");

type NoCommitmentPageProps = {
  onCommit: () => void;
};
export default function NoCommitmentPage({ onCommit }: NoCommitmentPageProps) {
  const [loading, setLoading] = useState(false);
  const commit = useCallback(() => {
    setLoading(true);
    (async () => {
      try {
        const address = "0x8cc063c16aba6400404602f84f45639af4100395";
        const { abi } = GymBountyArtifact;
        const wallet = sequence.getWallet();
        const signer = wallet.getSigner();

        const contract = new Contract(address, abi, signer);

        await contract.commit({ value: 30 }); //"90000000000000000000" });

        onCommit();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const { abi } = GymBountyArtifact;

    (window as any).address = address;
    (window as any).ethers = ethers;
    (window as any).abi = abi;
    (window as any).metaMaskContract = new Contract(
      address,
      abi,
      new ethers.providers.Web3Provider((window as any).ethereum).getSigner()
    );
  }, []);
  return (
    <div>
      <h1> No active commitment </h1>
      {loading && <p>loading...</p>}
      {!loading && (
        <button onClick={commit}>I pledge to workout for 30 days</button>
      )}
    </div>
  );
}
