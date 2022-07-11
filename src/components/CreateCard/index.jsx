import { useState } from "react";
import { Button, Input } from "antd";
import "./styles.scss";

export default function CreateCard({
  listKey,
  handleCreateCard,
  creatingCard,
  handleCreatingCard,
}) {
  const [cardTitle, setCardTitle] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (cardTitle !== "") {
      handleCreateCard({ cardTitle, listKey });
      setCardTitle("");
      handleCreatingCard(false);
    }
  };

  const { TextArea } = Input;

  return (
    <div className="create-card">
      {creatingCard ? (
        <div className="create-card-form-container">
          <TextArea
            value={cardTitle}
            placeholder="Enter the title for this card..."
            onSubmit={(event) => handleOnSubmit(event)}
            rows={2}
            onChange={(e) => setCardTitle(e.target.value)}
            autoFocus
          />
          <Button
            type="primary"
            style={{
              borderRadius: "12px",
              fontWeight: 500,
              border: "rgb(60, 64, 82)",
              backgroundImage: "linear-gradient(45deg, #606c88, #3f4c6b)",
              marginRight: "8px",
            }}
            onClick={(event) => handleOnSubmit(event)}
          >
            Create
          </Button>
          <Button
            type="primary"
            shape="circle"
            style={{
              fontWeight: 500,
              color: "#3f4c6b",
              backgroundColor: "#fff",
              boxShadow: "none",
              border: "1px solid #3f4c6b",
            }}
            onClick={() => {
              setCardTitle("");
              handleCreatingCard(false);
            }}
          >
            X
          </Button>
        </div>
      ) : (
        // eslint-disable-next-line
        <a onClick={handleCreatingCard}>+ Add Card</a>
      )}
    </div>
  );
}
