import React from 'react';
import { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css"
import axios from 'axios';

type User = {
  createdAt: string,
  email: string,
  hashed_password: string,
  metadata: any,
  salt: string,
  updatedAt: string,
  username: string
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const removeAllUsers = async () => {
    return axios.post('http://localhost:8001/remove_all_users');
  }

  const createTestUser = async () => {
    return axios.get('http://localhost:8001/create_test_user');
  }

  const getAllUsers = async (setIsLoading: any, setUsers: any) => {
    return axios.get('http://localhost:8001/users')
      .then(res => {
        setIsLoading(false);
        const user_list = [] as User[];
        for (const user of res.data) {
          user_list.push({
            createdAt: user.createdAt,
            email: user.email,
            hashed_password: user.hashed_password,
            metadata: user.metadata,
            salt: user.salt,
            updatedAt: user.updatedAt,
            username: user.username
          });
        }
        setUsers(user_list);
      });
  };

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (isLoading) {
      getAllUsers(setIsLoading, setUsers).then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <div className="">
      <header>
      </header>
      <main className="p-8 top-0">
        <p>This exists only to show that the connection to the database is working as intended. Every user in the database is listed below.</p>

        <div className="mt-4 mb-2 inline-block"><a onClick={() => removeAllUsers().then(() => {
          getAllUsers(setIsLoading, setUsers)
        })} className="bg-black p-2 text-white mr-1 rounded-md cursor-pointer">Remove all users</a>
        <a onClick={() =>
          createTestUser().then(() => {
            getAllUsers(setIsLoading, setUsers)
          })
        } className="bg-black p-2 text-white rounded-md cursor-pointer">Create test user</a></div>
        {isLoading ? <p>Loading...</p> :
          users.map((user: User) => (
            <div className="mt-2 py-2 px-4 bg-gray-200 rounded-md" key={user.username}>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Hashed password: {user.hashed_password}</p>
              <p>Salt: {user.salt}</p>
              <p>Metadata: {user.metadata}</p>
            </div>
          ))
        }
      </main>
    </div>
  );
}

export default App;
