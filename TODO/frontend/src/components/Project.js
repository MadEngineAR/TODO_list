import React from 'react';

const ProjectItem = ({project}) => {
   return (

            <tr>
                <td>
                   {project.name}
                </td>
                <td>
                   {project.resp_link}
                </td>
                <td>
                    {project.users.join(",")}
                </td>
            </tr>
   )
}

const ProjectList = ({projects}) => {
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

           {projects.map((project) => <ProjectItem project={project} />)}
       </table>
) }
export default ProjectList