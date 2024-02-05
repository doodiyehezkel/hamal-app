
export type User = {
    _id: string
    name: string
    role: string
}

export type UserProps = {
    _id: string
    name: string
    role: string
    onUpdateUserHandler: (id: string, name: string, role: string) => void
    onDeleteUserHandler: (id: string) => void
}

export type UserListProps = {
    userList: User[]
    onUpdateUserHandler: (id: string, name: string, role: string) => void
    onDeleteUserHandler: (id: string) => void
}

export type CreateUserFormProps = { 
    onSubmitHandler: (name: string, password: string , role: string) => void
}


