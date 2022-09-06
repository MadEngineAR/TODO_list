import React from 'react';
import {Link} from "react-router-dom";

const ProjectItem = ({project, delete_project}) => {
   return (

            <tr>
                <td>
                    <td><Link to={`/projects/${project.name}`}>{project.name}</Link></td>
                </td>
                <td>
                   {project.resp_link}
                </td>
                <td>
                    {project.users.join(",")}
                </td>
                <td><button onClick={()=>delete_project(project.id)} type='button'>Delete</button></td>
            </tr>
   )
}

const ProjectList = ({projects, delete_project}) => {
    return (
        <table  className="table_center_by_css">
            <th>
               Name
            </th>
            <th>
              Resp link
            </th>
            <th>
               Users
            </th>
            <th></th>
           {projects.map((project) => <ProjectItem project={project} delete_project={delete_project}/>)}
       </table>
) }
export default ProjectList