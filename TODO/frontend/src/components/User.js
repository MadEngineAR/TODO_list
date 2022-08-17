import React from 'react';

const UserItem = ({user}) => {
   return (

            <tr>
                <td>
                   {user.first_name}
                </td>
                <td>
                   {user.last_name}
                </td>
                <td>
                    {user.username}
                </td>
                <td>
                    {user.email}
                </td>
            </tr>
   )
}

const UserList = ({users}) => {
    return (
        <table  className="table_center_by_css">
            <th>
               First name
            </th>
            <th>
              Last Name
            </th>
            <th>
               Username
            </th>
            <th>
               Email
            </th>
           {users.map((user) => <UserItem user={user} />)}
       </table>
) }
export default UserList