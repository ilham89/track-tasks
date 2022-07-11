import { useState } from "react";
import { Button, Input } from "antd";
import "./styles.scss";

export default function CreateList({ handleCreateList }) {
  const [listTitle, setListTitle] = useState("");
  const [editing, setEditing] = useState(false);

  const handleEnableEditing = () => {
    setEditing(true);
  };

  const handleDisableEditing = () => {
    setEditing(false);
  };

  const handleInputChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleCreateList(listTitle);
    setEditing(false);
    setListTitle("");
  };
  return (
    <div className="create-list">
      {editing ? (
        <form
          onBlur={handleDisableEditing}
          onSubmit={(e) => handleSubmitForm(e)}
          className="create-list-form"
        >
          <Input
            placeholder="Create a new list..."
            onChange={(e) => handleInputChange(e)}
            autoFocus
            autoComplete="off"
          />
        </form>
      ) : (
        <Button className="create-list-button" onClick={handleEnableEditing}>
          + Add another list
        </Button>
      )}
    </div>
  );
}
