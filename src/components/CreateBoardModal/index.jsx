import { useState } from "react";
import { Button, Input, Modal, Form } from "antd";
import "./styles.scss";

export default function CreateBoardModal({
  onCloseModal,
  onCreateBoard,
  visible,
}) {
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("#f6b73c");

  const handleCreateBoard = (event) => {
    event.preventDefault();
    if (boardTitle !== "") {
      onCreateBoard({ title: boardTitle, color: selectedColor });
      setBoardTitle("");
    }
  };

  const handleBoardTitleChange = (event) => {
    setBoardTitle(event.target.value);
  };

  return (
    <Modal
      title="Create board"
      width="320px"
      style={{ top: 60 }}
      visible={visible}
      onCancel={onCloseModal}
      footer={null}
    >
      <Form onSubmit={(event) => handleCreateBoard(event)}>
        <Input
          style={{ marginBottom: 16 }}
          placeholder="Add board title"
          onChange={(event) => handleBoardTitleChange(event)}
          value={boardTitle}
          autoFocus
          autoComplete="off"
        />
        <div className="color-container">
          <input
            type="color"
            className="input-color"
            defaultValue={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        </div>
        <Button
          disabled={boardTitle === ""}
          type="primary"
          onClick={(event) => handleCreateBoard(event)}
          key="0"
        >
          Create
        </Button>
      </Form>
    </Modal>
  );
}
