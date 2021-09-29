type User = {
    createdAt: string,
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true,
        unique: true
    },
    metadata: any,
    updatedAt: string
}

export default User;