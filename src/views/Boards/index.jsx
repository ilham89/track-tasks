import { useState, useEffect, lazy } from "react";
import { mergeDataWithKey } from "../../utils";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./styles.scss";
const Loader = lazy(() => import("../components/Loader"));
const CreateBoardCard = lazy(() => import("../components/CreateBoardCard"));
const CreateBoardModal = lazy(() => import("../components/CreateBoardModal"));

function Boards() {
  const [modalOpen, setModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get boards
  useEffect(() => {
    setLoading(true);
    db.onceGetBoards()
      .then((snapshot) => {
        if (!snapshot.val()) {
          setLoading(false);
          return;
        }
        setBoards(mergeDataWithKey(snapshot.val()));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCreateBoard = (board) => {
    db.doCreateBoard(board).then((response) => {
      const updatedBoards = [...boards];
      updatedBoards.push(response);
      setBoards(updatedBoards);
      setModalOpen(false);
    });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="boards-view-container">
          <div className="boards-container">
            {boards.map((board, index) => {
              return (
                <div key={index}>
                  <Link
                    index={index}
                    to={{
                      pathname: `b/${board.key}`,
                      state: { boardKey: board.key },
                    }}
                  >
                    <Button className="board-card">{board.title}</Button>
                  </Link>
                </div>
              );
            })}
            <CreateBoardCard onClick={() => handleModalOpen()} />
          </div>
          <CreateBoardModal
            onCreateBoard={handleCreateBoard}
            onCloseModal={handleModalClose}
            visible={modalOpen}
          />
        </div>
      )}
    </>
  );
}

export default Boards;