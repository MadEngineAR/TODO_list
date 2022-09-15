import React from 'react';
import project from "./Project";
import {useParams} from "react-router-dom";


class ProjectUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props.match.params.id);
        this.state = {
            id: '',
            name: '',
            resp_link: '',
            users: []
        };
    }


    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

      handleRepLinkChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleUserChange(event) {

        if (!event.target.selectedOptions) {
            this.setState({

                'users': []
            });
            return;
        }
        let users = [];
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value);
        }

        console.log(users);
        this.setState(
            {'users': users}
        );
    };


    handleSubmit(event) {
        console.log(project.id);
        // this.props.update_project(this.state.id,this.state.name, this.state.resp_link, this.state.users);
          this.props.update_project(this.state.id,this.state.name, this.state.resp_link, this.state.users);
        event.preventDefault();


    }



    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name"
                           value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Resp Link">Resp Link</label>
                    <input type="text" className="form-control" resp_link="resp_link"
                           value={this.state.resp_link} onChange={(event) => this.handleRepLinkChange(event)}/>
                </div>
                <div> Users
                    <select name="users" multiple
                            onChange={(event)   => this.handleUserChange(event)}>

                        {this.props.users.map((item) => <option
                            value={item.id}>{item.username}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Update"
                />

            </form>
        );
    }
}

export default ProjectUpdateForm