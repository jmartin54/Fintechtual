type WrongNetworkPageProps = {
  onClickOpenWallet: () => void;
};
export default function WrongNetworkPage({
  onClickOpenWallet,
}: WrongNetworkPageProps) {
  return (
    <div>
      <h1>ERROR: Wrong Network</h1>
      <p>
        YOU MUST ENABLE WALLET TESTNETS{" "}
        <strong> Before you login to your sequence wallet</strong>, You didn't
        do this, so now you need to <strong>1. logout</strong>{" "}
        <strong>
          2. click "enable testnets" in the lower righthand corner
        </strong>{" "}
        <strong>3. log back in</strong>
      </p>
      <a href="#" onClick={onClickOpenWallet}>
        Open Wallet to Log out
      </a>
    </div>
  );
}
