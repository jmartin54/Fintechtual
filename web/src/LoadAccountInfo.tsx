import { sequence } from "0xsequence";
import { Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";
import ActiveCommitmentPage from "./Pages/ActiveCommitmentPage";
import LoadingPage from "./Pages/LoadingPage";
import NoCommitmentPage from "./Pages/NoCommitmentPage";
import { address } from "./Constants";
import Commitment from "./Models/Commitment";
import CompletedCommitmentPage from "./Pages/CompletedCommitmentPage";
import CompletedTodayPage from "./Pages/CompletedTodayPage";
const GymBountyArtifact = require("./GymBounty.json");

type LoadAccountInfoProps = {
  walletAddress: string;
  onLogout: () => void;
};
export default function LoadAccountInfo({
  walletAddress,
  onLogout,
}: LoadAccountInfoProps) {
  const [state, setState] = useState("loading");
  const [commitments, setcommitments] = useState<
    [Commitment, Commitment] | null
  >(null);
  useEffect(() => {
    reload();
  }, [walletAddress]);

  const reload = useCallback(() => {
    if (walletAddress == "") return;
    (async () => {
      const abi = GymBountyArtifact.abi;
      const wallet = sequence.getWallet();
      const signer = wallet.getSigner({ name: "mumbai", chainId: 0x013881 });

      const contract = new Contract(address, abi, signer);
      (window as any).contract = contract;

      const now = Date.now() / 1000;
      const day = 60 * 60 * 24;
      const today = Math.floor(now / day);
      (window as any).today = today;

      const [res1, res2] = await Promise.all([
        contract.commitments(walletAddress, today),
        contract.commitments(walletAddress, today + 1),
      ]);
      setcommitments([res1, res2]);

      (window as any).cmtmts = [res1, res2];

      if (!res1.commited && !res2.commited) {
        const prev7 = await Promise.all([
          contract.commitments(walletAddress, today - 1),
          contract.commitments(walletAddress, today - 2),
          contract.commitments(walletAddress, today - 3),
          contract.commitments(walletAddress, today - 4),
          contract.commitments(walletAddress, today - 5),
          contract.commitments(walletAddress, today - 6),
          contract.commitments(walletAddress, today - 7),
        ]);
        let payable = prev7.filter((com) => com.commited);
        if (payable.length > 0) {
          setState("completedCommitment");
        }
        if (payable.length <= 0) {
          setState("noCommitments");
        }
      }
      if (!res1.commited && res2.commited) {
        setState("completedToday");
      }
      if (res1.commited && res1.fullfill) {
        setState("completedToday");
      }
      if (res1.commited && !res1.fulfilled) {
        setState("activeCommitments");
      }
      if (res1.commited && !res2.commited) {
        setState("completedCommitment");
      }
    })();
  }, [walletAddress]);

  const openWallet = useCallback(() => {
    const wallet = sequence.getWallet();
    wallet.openWallet();
  }, []);

  return (
    <div>
      <button onClick={openWallet}>Open Wallet</button>
      <button onClick={onLogout}>Log Out</button>
      {state == "loading" && <LoadingPage />}
      {state == "noCommitments" && <NoCommitmentPage onCommit={reload} />}
      {state == "activeCommitments" && commitments != null && (
        <ActiveCommitmentPage
          todaysCommitment={commitments[0]}
          tomorrowsCommitment={commitments[1]}
          onCheckin={reload}
        />
      )}
      {state == "completedToday" && <CompletedTodayPage />}
      {state == "completedCommitment" && <CompletedCommitmentPage />}
    </div>
  );
}
