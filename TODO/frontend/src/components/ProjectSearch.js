import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import project from "./Project";



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
const ProjectListSearch = ({projects}) => {
    const [inputValue, setInputValue] = useState();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
    let name = inputValue
    let filtered_items = projects.filter((project) => project.name.includes(name))
    console.log(filtered_items)

    return (
        <div>
            <input className="rarity-input" placeholder="Search value" value={inputValue} onChange={handleChange} />
            <table className="table_center_by_css">
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>RESP LINK</th>
                    <th>USERS</th>
                </tr>
                {filtered_items.map((project) => <ProjectItem project={project}/>)}
            </table>
        </div>
    )
}

export default ProjectListSearch