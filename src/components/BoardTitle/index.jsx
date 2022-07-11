import { useState, useEffect } from "react";
import { Button, Menu, Dropdown, Input } from "antd";
import "./styles.scss";

export default function BoardTitle({
  title,
  boardKey,
  updateBoard,
  deleteBoard,
}) {
  const [boardTitle, setBoardTitle] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setBoardTitle(title);
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setBoardTitle(e.target.value);
  };

  const handleEnableEdit = () => {
    setEditing(true);
    setBoardTitle(title);
  };

  const handleDisableEdit = () => {
    setEditing(false);
    setBoardTitle("");
  };

  const handleFormSubmit = (event, callback, boardKey, boardTitle) => {
    event.preventDefault();

    if (boardTitle !== "") {
      callback(boardKey, { title: boardTitle }).then(() => {
        setBoardTitle("");
        setEditing(false);
      });
    }
  };

  return (
    <div className="board-topbar">
      <div className="left">
        {editing ? (
          <form
            onSubmit={(event) => {
              handleFormSubmit(event, updateBoard, boardKey, boardTitle);
            }}
            onBlur={handleDisableEdit}
          >
            <Input
              autoComplete="off"
              value={boardTitle}
              onChange={handleInputChange}
              autoFocus
              style={{
                maxWidth: "200px",
                fontSize: "1.125rem",
                fontWeight: 500,
              }}
            />
          </form>
        ) : (
          <Button onClick={handleEnableEdit} className="board-title">
            {title}
          </Button>
        )}
      </div>
      <div className="right">
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="0" onClick={() => deleteBoard(boardKey)}>
                Delete board
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button>Show Menu</Button>
        </Dropdown>
      </div>
    </div>
  );
}
