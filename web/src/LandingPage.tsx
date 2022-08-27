type LandingPageProps = {
  onClickConnect: () => void;
};
export default function LandingPage({ onClickConnect }: LandingPageProps) {
  return (
    <>
      <div className="header">
        <h1>Gym Bounty</h1>
        <p>
          Cryptocurrency is about more than money. Smart contracts can create
          governments.
        </p>
        <p>
          To explore the concept of voluntary taxation and programmatic tax
          codes, I've created a simple special-interest dApp.
        </p>
      </div>
      <div style={{ display: "flex" }}>
        <div className="card">
          <h2>1. Commit</h2>
          <p>Commit to working out for the next 30 days.</p>
          <p>Pay a voluntary tax of 3 MATIC a day. (90 MATIC in total)</p>
        </div>
        <div className="card">
          <h2>2. Work out</h2>
          <p>
            Work out every day. Check in on this website when you're at the gym.
          </p>
        </div>
        <div className="card">
          <h2>3. Redistritbution</h2>
          <p>
            When other people fail to meet their commitments, that money is
            redistributed to the people that actually showed up and did what
            they said they would.
          </p>
          <p>
            For example, say 10 people said they'd work out today, but only 2
            did. 10 people would have put in 30 MATIC total. The two people who
            worked out get 15 MATIC each. They just made 12 MATIC for
            contributing to the common good by being healthy.
          </p>
          <p>This is a new form of voluntary taxation</p>
        </div>
      </div>
      <a href="#" onClick={onClickConnect}>
        Connect Wallet
      </a>
      <p>
        Please note: <strong>YOU MUST ENABLE WALLET TESTNET</strong> Before you
        login to your sequence wallet,{" "}
        <strong>click enable testnets in the lower righthand corner</strong> the
        smart contract is deployed onto the polygon mumbai testnet.
      </p>
    </>
  );
}
