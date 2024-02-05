
import UserCard from "../user/UserCard";
import style from "./UserList.module.css"
import { UserListProps } from "../../../types/user";

export default function UserList(props: UserListProps) {

    return (
        <div className={style["user-list-container"]}>
            {
                props.userList?.map(item => {
                    return (
                        <div key={item._id} className={style["user-card-container"]}>
                            <UserCard
                                _id={item._id}
                                name={item.name}
                                role={item.role}
                                onUpdateUserHandler={props.onUpdateUserHandler}
                                onDeleteUserHandler={props.onDeleteUserHandler}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}