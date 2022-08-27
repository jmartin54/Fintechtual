import Commitment from "./Models/Commitment";

type ShowCommitmentProps = {
  commitment: Commitment;
};
export default function ShowCommitment({ commitment }: ShowCommitmentProps) {
  return (
    <div>
      <p>{commitment.commited ? "Commited" : "Not commited yet"}</p>
      <p>{commitment.fulfilled ? "You did it!" : "Not done"}</p>
      <p>{commitment.claimed ? "You withdrew funds" : "Not withdrawn"}</p>
    </div>
  );
}
