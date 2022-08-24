import React from 'react';

const TodoItem = ({todo}) => {
   return (
            <tr>
                <td>
                   {todo.project}
                </td>
                <td>
                   {todo.text}
                </td>
                <td>
                    {todo.user}
                </td>
                  <td>
                    {todo.created_at}
                </td>
                <td>
                    {todo.updated_at}
                </td>
                <td>
                    {String(todo.is_active)}
                </td>
            </tr>
   )
}

const TodoList = ({todoArticles}) => {
    return (
        <table  className="table_center_by_css">
            <th>
               Project
            </th>
            <th>
               Text
            </th>
            <th>
               User
            </th>
            <th>
               Created_at
            </th>
            <th>
               Updated_at
            </th>
            <th>
               Is active
            </th>
           {todoArticles.map((todo) => <TodoItem todo={todo} />)}
       </table>
) }
export default TodoList