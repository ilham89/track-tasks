import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./styles.scss";
import CardModal from "../CardModal";

export default function Card({
  index,
  title,
  description,
  cardKey,
  listKey,
  handleEditCard,
  handleDeleteCard,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [editing, setEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  useEffect(() => {
    setCardTitle(title);
    // eslint-disable-next-line
  }, []);

  const handleTitleChange = (e) => {
    setCardTitle(e.target.value);
  };

  const handleShowIcons = () => {
    setShowIcons(true);
  };

  const handleHideIcons = () => {
    setShowIcons(false);
  };

  const handleEnableEditing = () => {
    setEditing(true);
  };

  const handleDisableEditing = () => {
    setEditing(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleSubmitForm = (event, callback, listKey, cardKey, title) => {
    event.preventDefault();

    const card = { title: cardTitle };
    callback({ listKey, cardKey, card }).then(() => setEditing(false));
  };

  const onDeleteCard = (callback, listKey, cardKey) => {
    callback({ listKey, cardKey });
  };

  return (
    <>
      <Draggable draggableId={String(cardKey)} index={index}>
        {(provided) => (
          <>
            <div
              className="card-container"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onMouseEnter={handleShowIcons}
              onMouseLeave={handleHideIcons}
              onBlur={handleDisableEditing}
            >
              <div className="card-container__content">
                {editing ? (
                  <form
                    onSubmit={(event) =>
                      handleSubmitForm(
                        event,
                        handleEditCard,
                        listKey,
                        cardKey,
                        title
                      )
                    }
                  >
                    <Input
                      value={cardTitle}
                      onChange={(event) => handleTitleChange(event)}
                      autoFocus
                      autoComplete="off"
                    />
                  </form>
                ) : (
                  <div onClick={() => handleShowModal()}>
                    {showIcons && (
                      <div
                        className="card-icons"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Button
                          onClick={handleEnableEditing}
                          icon={<EditOutlined />}
                          style={{ fontSize: 8, border: "none" }}
                        ></Button>
                        <Button
                          onClick={() =>
                            onDeleteCard(handleDeleteCard, listKey, cardKey)
                          }
                          icon={<DeleteOutlined />}
                          style={{ fontSize: 8, border: "none" }}
                        ></Button>
                      </div>
                    )}
                    <div>{title}</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Draggable>
      <CardModal
        visible={showModal}
        cardTitle={cardTitle}
        cardDescription={description}
        cardKey={cardKey}
        listKey={listKey}
        handleEditCard={handleEditCard}
        handleHideModal={handleHideModal}
      />
    </>
  );
}
