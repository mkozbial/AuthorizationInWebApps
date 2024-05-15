import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
import { ReactComponent as Trash} from "../../assets/icons/trash.svg";
import { ReactComponent as Pen } from "../../assets/icons/pencil-square.svg";
import { ReactComponent as X } from "../../assets/icons/x-lg.svg";
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Dialog from '@radix-ui/react-dialog';

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUserType, setSelectedUserType] = useState("user");
    const [selectedUserID, setSelectedUserID] = useState("");
    const myUsername = localStorage.getItem("username");

    function getUsersList() {
          const getUsers = () => {
            const token = localStorage.getItem("accessToken");
            const url = 'http://localhost:8080/admin/users';

            return fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.data) {
                    return data.data;
                } else {
                    throw new Error('Invalid response format');
                }
            })
            .catch(error => {
                console.error('There was a problem fetching users:', error);
                throw error;
            });
        }

        getUsers()
        .then(usersData => {
            setUsers(usersData);
        })
        .catch(error => {
            console.error('Wystąpił błąd podczas pobierania użytkowników:', error);
        });
    }

    useEffect(() => {
        getUsersList();
    }, []);

    const editRole = (userType: string, userID: string) => {
        const token = localStorage.getItem("accessToken");
        const url = `http://localhost:8080/admin/users/${userID}`;
    
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_type: userType
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.data.user_type;
        })
        .catch(error => {
            console.error('There was a problem with the editing role', error);
            return false;
        });
    }

    const handleUserTypeChange = (newUserType: string, userID: string) => {
        editRole(newUserType, userID)
            .then(newRole => {
                if (newRole) {
                    getUsersList();
                }
        })
        .catch(error => {
            console.error("Błąd podczas zmiany typu użytkownika:", error);
        });
    };

    return (
        <Dialog.Root>
            <div className="admin-panel">
                <p className="admin-panel__header">Admin Panel</p>
                <div className="admin-panel__user-list">
                    <p className="admin-panel__user-list__title">Users List</p>
                    {users.map((user, id) => user.username !== myUsername && (
                        <>
                            <div key={user.user_id} className="admin-panel__user">
                                <div className="admin-panel__user-info">
                                    <p className="admin-panel__username">{user.user_id}</p>
                                    <p className="admin-panel__username">{user.username}</p>
                                    <p className="admin-panel__username">{user.user_type}</p>
                                </div>
                                <div>
                                    <Dialog.Trigger asChild>
                                        <Pen className="admin-panel__icon" onClick={() => { setSelectedUserID(user.user_id)}}/>
                                    </Dialog.Trigger>
                                    <Trash className="admin-panel__icon" />
                                </div>
                            </div>
                            <Dialog.Portal>
                                <Dialog.Overlay className="dialog__overlay"/>
                                <Dialog.Content className="dialog__content">
                                    <Dialog.Title className="dialog__title">Edit profile</Dialog.Title>
                                    <Dialog.Description className="dialog__description">
                                        Make changes to your profile here. Click save when you're done.
                                    </Dialog.Description>
                                    <fieldset className="dialog__fieldset">
                                    <form>
                                            <RadioGroup.Root className="radio" defaultValue="default" aria-label="View density">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <RadioGroup.Item className="radio__item" value="default" id="r1" onClick={() => { setSelectedUserType("user"); }}>
                                                    <RadioGroup.Indicator className="radio__indicator" />
                                                    </RadioGroup.Item>
                                                    <label className="radio__label" htmlFor="r1">
                                                        User
                                                    </label>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <RadioGroup.Item className="radio__item" value="comfortable" id="r2" onClick={() => { setSelectedUserType("admin"); }}>
                                                    <RadioGroup.Indicator className="radio__indicator" />
                                                    </RadioGroup.Item>
                                                    <label className="radio__label" htmlFor="r2">
                                                        Admin
                                                    </label>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <RadioGroup.Item className="radio__item" value="compact" id="r3" onClick={() => { setSelectedUserType("editor"); }}>
                                                    <RadioGroup.Indicator className="radio__indicator" />
                                                    </RadioGroup.Item>
                                                    <label className="radio__label" htmlFor="r3">
                                                        Editor
                                                    </label>
                                                </div>
                                            </RadioGroup.Root>
                                        </form>
                                    </fieldset>
                                    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                        <Dialog.Close asChild>
                                                <button className="dialog__button" onClick={() => { handleUserTypeChange(selectedUserType, selectedUserID);}}>Save changes</button>
                                        </Dialog.Close>
                                    </div>
                                    <Dialog.Close asChild>
                                        <button className="dialog__x-button" aria-label="Close">
                                            <X />
                                        </button>
                                    </Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </>
                    ))}
                </div>
            </div>
        </Dialog.Root>
    );
}

export default AdminPage;