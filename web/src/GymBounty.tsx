import { useCallback, useEffect, useState } from "react";
import ShowCommitment from "./ShowCommitment";
import Commitment from "./Models/Commitment";
import { sequence } from "0xsequence";
import { ethers } from "ethers";
const GymBountyArtifact = require("./GymBounty.json");

type GymBountyProps = {
  address: string;
  onClickOpenWallet: () => void;
};
export default function GymBounty({
  address,
  onClickOpenWallet,
}: GymBountyProps) {
  const [commitments, setCommitments] = useState<Commitment[] | null>(null);
  const [fundsAvailable, setFundsAvailable] = useState<number | null>(null);
  const [startsExpiringIn, setStartsExpiringIn] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // get contract
        const address = "0x8cc063c16aba6400404602f84f45639af4100395";
        const abi = GymBountyArtifact.abi;
        const wallet = sequence.getWallet();
        const signer = wallet.getSigner({ name: "mumbai", chainId: 0x013881 });

        const contract = new ethers.Contract(address, abi, signer);

        // get wallet address
        const walletAddress = await wallet.getAddress();
        const now = Date.now() / 1000;
        const day = 60 * 60 * 24;
        const today = Math.floor(now / day);
        console.log(today);
        const t = await contract.callStatic.treasury(today);
        console.log(t);

        // load commitments today, ... +30
        // load commitments yesterday, ... -30
        // sum funds
        // calculate starts expiring as first unclaimed day + 30
        // load next 30 days treasury
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const commit = useCallback(() => {
    (async () => {
      // show loading
      // get contract
      // await commit
      // update commitmernts + 30 days treasury
    })();
  }, []);

  const fulfill = useCallback(() => {
    (async () => {
      // show loading
      // get contract
      // await fulfill
      // update today
    })();
  }, []);

  const withdraw = useCallback(() => {
    (async () => {
      // show loading
      // get contract
      // await withdraw
      // update last 30, sum, expiring starts in
    })();
  }, []);

  return (
    <div>
      <h1> Hello {address} </h1>

      {commitments == null && "Loading..."}
      <div style={{ display: "flex" }}>
        {commitments != null &&
          commitments.map((c) => (
            <div className="card">
              <ShowCommitment commitment={c} />
            </div>
          ))}
      </div>
      {fundsAvailable !== null && (
        <div>
          <p>{fundsAvailable} matic available to withdraw</p>
          <a href="#" onClick={withdraw}>
            Withdraw funds
          </a>
        </div>
      )}
      {startsExpiringIn !== null && (
        <p>
          {startsExpiringIn} days left to withdraw funds.
          <br />
          <small>
            You have to withdraw funds in a timely manner or they expire.
          </small>
        </p>
      )}

      <pre>
        {`
        show loading
        show error

        today
            [check in at gym] + don't lie copy
            good job war. Daily effort compounds.
        commitments.map => 
            commited
        renew your pledge on [date]

        funds available
        last 30 days you commit x days and fulfilled y days
        adding the failure of others and subtracting gas you can withdraw m matic
        [withdraw]
`}
      </pre>

      <pre>
        {`

Get commitments
if none show [commit to 30] button and explanation
if commitments
    if today.fulfilled [rest easy warrior. today's works is done]
    if !today.fulfilled [check in for workout] [everything we do here is voluntary and for honor. Do not cheat by lying. Suffer the cost of your failure with dignity and honor.]

Get funds available, starts expiring on
if funds > 0 [withdraw funds]

`}
      </pre>

      <a href="#" onClick={onClickOpenWallet}>
        Logout
      </a>
    </div>
  );
}
