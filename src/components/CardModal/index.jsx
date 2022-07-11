import { useState, useEffect } from "react";
import { Button, Modal, Input } from "antd";
import {
  TagOutlined,
  ProjectOutlined,
  AlignLeftOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

export default function CardModal({
  visible,
  cardTitle,
  handleHideModal,
  cardDescription,
  handleEditCard,
  cardKey,
  listKey,
}) {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(cardDescription);
    // eslint-disable-next-line
  }, []);

  const handleEnableEditing = () => {
    setEditing(true);
  };

  const handleDisableEditing = () => {
    setEditing(false);
    setDescription("");
  };

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitForm = (event, callback, listKey, cardKey) => {
    event.preventDefault();
    const updatedCard = {
      title: cardTitle,
      description: description ? description : "",
    };
    callback({ listKey, cardKey, card: updatedCard }).then(() => {
      handleDisableEditing();
    });
  };
  return (
    <Modal
      title={
        <div>
          <h4 style={{ margin: 0 }}>
            <ProjectOutlined style={{ marginRight: "8px" }} />
            <span>{cardTitle}</span>
          </h4>
        </div>
      }
      visible={visible}
      onCancel={() => {
        handleHideModal();
        handleDisableEditing();
      }}
      footer={null}
    >
      <div className="labels-container" style={{ marginBottom: "24px" }}>
        <h4>
          <TagOutlined style={{ marginRight: "8px" }} />
          <span>Labels</span>
        </h4>
        <div className="labels-selection">
          <Button type="primary" style={{ marginRight: "4px" }}>
            Low
          </Button>
          <Button
            type="primary"
            style={{
              marginRight: "4px",
              backgroundColor: "#ebc36a",
              borderColor: "#ebc36a",
            }}
          >
            Medium
          </Button>
          <Button
            type="primary"
            style={{
              marginRight: "4px",
              backgroundColor: "#c74235",
              borderColor: "#c74235",
            }}
          >
            High
          </Button>
        </div>
      </div>
      <div className="description-container">
        <h4>
          <AlignLeftOutlined style={{ marginRight: "8px" }} />{" "}
          <span>Description</span>
        </h4>
        <div className="description-content">
          {editing ? (
            <>
              <form
                onSubmit={(event) =>
                  handleSubmitForm(event, handleEditCard, listKey, cardKey)
                }
              >
                <TextArea
                  value={description}
                  onChange={(e) => handleInputChange(e)}
                  placeholder={
                    description === ""
                      ? "Add a more detailed description..."
                      : description
                  }
                  autoFocus
                />
                <Button
                  onClick={(event) =>
                    handleSubmitForm(event, handleEditCard, listKey, cardKey)
                  }
                >
                  Save
                </Button>
                <Button onClick={handleDisableEditing}>Cancel</Button>
              </form>
            </>
          ) : (
            <div onClick={handleEnableEditing}>
              {cardDescription ? (
                <span>{cardDescription}</span>
              ) : (
                <span>Add a more detailed description...</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
