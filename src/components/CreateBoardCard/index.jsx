import { Button } from "antd";
import "./styles.scss";

export default function CreateBoardCard({ onClick }) {
  return (
    <Button className="create-board-card" onClick={onClick}>
      Create a new board...
    </Button>
  );
}
