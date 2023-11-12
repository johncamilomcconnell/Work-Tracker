import React from 'react'

interface Users {
    id: number;
    name: string;
    email: string;
}

const UsersPage = async () => {

    const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        { next: { revalidate: 60 }});
    const users: Users[] = await response.json();
    
return (
    <div>
        <h1>UsersPage</h1>
        <p>{new Date().toLocaleTimeString()}</p>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            {users.map((user) => 
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                </tr>
            )}
            </tbody>
        </table>
    </div>

  )
}

export default UsersPage