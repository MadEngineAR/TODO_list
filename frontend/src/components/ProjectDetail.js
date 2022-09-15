import React from 'react'
import {useParams} from 'react-router-dom'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.resp_link}</td>
            <td>{project.users.join(",")}</td>
        </tr>
    )
}
const ProjectListDetail = ({projects}) => {
    let {name} = useParams();
    console.log(name)
    let filtered_items = projects.filter((project) => project.id === parseInt(name))
    // console.log(filtered_items)

    return (
        <table className="table_center_by_css">
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>RESP LINK</th>
                <th>USERS</th>
            </tr>
            {filtered_items.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

export default ProjectListDetail