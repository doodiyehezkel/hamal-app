import style from "./AdminDashboardPage.module.css"
import CreateUserForm from "../../components/admin/create-user/CreateUserForm"
import UserList from "../../components/admin/user-list/UserList"
import { FormEvent, useEffect, useState, useContext } from "react"
import { User } from "../../types/user"
import { ToastPortalContext } from "../../contexts/ToastPortalContext"
import { ToastMode } from "../../types/toast"


export default function AdminDashboardPage() {


    const [userList, setUserList] = useState<User[]>([])
    const toastContext = useContext(ToastPortalContext)

    useEffect(() => {
        fetch('/api/user/all')
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => setUserList(data))

    }, [])

    const onSubmitHandler = async ( name: string, password: string, role: string) => {

        const response = await fetch(`/api/user/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                role
            })
        })

        if (!response.ok) {
            toastContext?.addToast({ message: '', mode: ToastMode.ERROR })

        }
        else {
            const data = await response.json()
            setUserList([...userList, data])
        }
    }


    const onUpdateUserHandler = (id: string, name: string, role: string) => {
        fetch('/api/user/update', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                name,
                role
            })
        })
            .then(response => { if (response.ok) return response.json() })
            .then((data) => {
                const updatedUserList = userList.map(item => {
                    if (item._id === data._id) return data
                    else return item
                })
                setUserList(updatedUserList)
            })
            .catch(error => console.log(error))
    }

    const onDeleteUserHandler = (id: string) => {
        fetch(`/api/user/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                const updatedUserList = userList.filter(item => item._id !== data._id)
                setUserList(updatedUserList)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={style['admin-dashboard-page']}>
            <div className={style['create-user-form-container']} >
                <CreateUserForm onSubmitHandler={onSubmitHandler} />
            </div>
            <div className={style['user-list-container']}>
                <UserList
                    userList={userList}
                    onUpdateUserHandler={onUpdateUserHandler}
                    onDeleteUserHandler={onDeleteUserHandler}
                />
            </div>
        </div>
    )
}