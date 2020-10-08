import React from "react";
import FluidLayoutWrapper from "../../../layout/FluidLayoutWrapper/FluidLayoutWrapper";
import UsersTableHeader from "../userTableHeader/UsersTableHeader";
import UsersTableRow from "../usersTableRow/UsersTableRow";
import FluidLayoutBody from "../../../layout/FluidLayouBody/FluidLayoutBody.js";

const UsersListTable = ({ users, deleteUser, editUser }) => {
  return (
    <FluidLayoutWrapper>
        <FluidLayoutBody>
            <table>
                <UsersTableHeader />
                <tbody>
                {users.map(user => {
                    return (
                        <UsersTableRow
                            user={user}
                            deleteUser={deleteUser}
                            editUser={editUser}
                        />
                    );
                })}
                </tbody>
            </table>
        </FluidLayoutBody>

    </FluidLayoutWrapper>
  );
};

UsersListTable.propTypes = {};

export default UsersListTable;
