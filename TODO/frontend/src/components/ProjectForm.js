import React from 'react';


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleUserChange(event) {

        if (!event.target.selectedOptions) {
            this.setState({

                'users': []
            });
            return;
        }
        let users = [];
        for (let i = 0; i < event.target.selectedOptions.lenght; i++) {
            users.push(event.target.selectedOptions.item(i).value);
        }

        console.log(users);
        this.setState(
            {'users': users}
        );
    };


    handleSubmit(event) {
        this.props.create_project(this.state.name, this.state.resp_link, this.state.users)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" className="form-control" name="name"
                           value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                </div>

                <select name="users" multiple
                        onChange={(event) => this.handleUserChange(event)}>
                    {this.props.users.map((item) => <option
                        value={item.url}>{item.username}</option>)}
                </select>

                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ProjectForm