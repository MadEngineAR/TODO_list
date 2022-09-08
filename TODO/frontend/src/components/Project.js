import React from 'react';
import {Link} from "react-router-dom";


const ProjectItem = ({project, delete_project, update_project}) => {
    return (

        <tr>
            <td>
                <td>
                    <Link to={`/projects/${project.id}`}>{project.id}</Link>
                    {/*{project.id}*/}
                </td>
            </td>
            <td>
                {project.name}
                {/*<td><Link to={`/projects/${project.name}`}>{project.name}</Link></td>*/}
            </td>
            <td>
                {project.resp_link}
            </td>
            <td>
                {project.users.join(",")}
            </td>
            <td>
                <button onClick={() => delete_project(project.id)} type='button'>Delete</button>
            </td>
             <td>
                <button onClick={() => update_project(project.id)}type='button'>
                     <Link to={`/projects/${project.id}/update/`}>Update_project</Link>
                </button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, delete_project, update_project}) => {
    return (
        <table className="table_center_by_css">
            <th>
                ID
            </th>
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

            {projects.map((project) => <ProjectItem project={project} delete_project={delete_project} update_project={update_project}/>)}
            <tr>
                <button>
                    <Link to={'/projects/create'}>Create_project</Link>
                </button>
            </tr>
        </table>
    )
}
export default ProjectList