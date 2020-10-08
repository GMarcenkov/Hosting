import React from "react";
import ModalLayoutWrapper from "../../layout/modalLayout/components/ModalLayoutWrapper";
import ModalLayoutContent from "../../layout/modalLayout/components/modalLayoutContent/ModalLayoutContent";
import ModalLayoutCloseButton from "../../layout/modalLayout/components/modalLayoutCloseButton/ModalLayoutCloseButton";
import RecordButton from "../../layout/modalLayout/components/recordButton/RecordButton";

const UserEditModal = ({
  editModalIsOpen,
  closeModal,
  editUser,
  user,
  handleInput
}) => {
  return (
    <div>
      <React.Fragment>
        {editModalIsOpen ? (
          <ModalLayoutWrapper>
            <ModalLayoutContent>
              <ModalLayoutCloseButton onClick={closeModal} />

              <div>
                <form>
                  <label
                    style={{
                      display: "inline-block",
                      float: "left",
                      clear: "left",
                      width: "250px",
                      textAlign: "right",
                      color: "white"
                    }}
                  >
                    Name:
                  </label>
                  <input
                    label="Име"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                  />
                  <label
                    style={{
                      display: "inline-block",
                      float: "left",
                      clear: "left",
                      width: "250px",
                      textAlign: "right",
                      color: "white"
                    }}
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    label="Парола"
                    name="password"
                    onChange={handleInput}
                  />
                </form>
              </div>

              <RecordButton onClick={editUser} title="Редактирай" />
            </ModalLayoutContent>
          </ModalLayoutWrapper>
        ) : null}
      </React.Fragment>
    </div>
  );
};

UserEditModal.propTypes = {};

export default UserEditModal;
