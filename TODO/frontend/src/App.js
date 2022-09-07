import React from 'react';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import axios from 'axios'
import TodoList from "./components/Todo";
import {Route, BrowserRouter, Link, Routes, Navigate,} from "react-router-dom";
import ProjectListDetail from "./components/ProjectDetail";
import LoginForm from "./components/Auth";
import Cookies from 'universal-cookie';
import User from "./components/User.js";
import project from "./components/Project.js";
import ProjectForm from "./components/ProjectForm";

const NotFound404 = () => {
    return (
        <div>
            <h1>Страница по адресу '{window.location.pathname}' не найдена</h1>
        </div>
    )
}

// console.log(ProjectListDetail)
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todoArticles': [],
            'token': '',
            'username': '',

        };
    }

    create_project(name, resp_link, users) {
        const headers = this.get_headers()
        const data = {name: name, resp_link:resp_link ,users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => {
            console.log(error)
            this.setState({
                projects: []
            })
        })
    }


    delete_project(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/books/${id}`, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            }
        )
    }

    set_token(token, username) {
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('username', username)
        this.setState({'token': token, 'username': username}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')

    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('username')
        this.setState({'token': token, 'username': username}, () => this.load_data())
    }


    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
                username: username,
                password: password
            },
            // {
            //     headers: {
            //         "Content-type": "application/json"
            //     }
            // }
        )


            .then(response => {
                console.log(response.data)
                this.set_token(response.data['access'], username)
            }).catch(error => alert('Неверный логин или пароль'))
        console.log(username)
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Bearer ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/authapp/', {headers}).then(response => {
            const users = response.data;

            this.setState(
                {
                    'users': users["results"],

                }
            )
        }).catch(error => {
            console.log(error);
            this.setState({'users': []});
        });

        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(response => {
            let projects;
            projects = response.data;


            this.setState(
                {
                    'projects': projects["results"],

                }
            );
        }).catch(error => {
            console.log(error);
            this.setState({'projects': []});

        });

        axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(response => {
            let todoArticles;
            todoArticles = response.data;

            this.setState(
                {
                    'todoArticles': todoArticles["results"],

                }
            );
        }).catch(error => {
            console.log(error);
            this.setState({
                'todoArticles': [],
            });
        });

    }


    componentDidMount() {

        this.get_token_from_storage()
    }

    render() {
        return (
            <body>
            <div>
                <BrowserRouter>
                    <menu className="text">
                        {this.is_authenticated() ?
                            <div className="App">
                                <button className="Button"
                                        onClick={() => this.logout()}>Logout
                                </button>
                                Ну, привет! {this.state.username}
                            </div>
                            :
                            <Link className="App" to='/login'>Login</Link>}
                        <li>
                            <Link to='/'>Users</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                        <li>
                            <Link to='/todo'>Todo</Link>
                        </li>


                    </menu>
                    <Routes>
                        <Route exact path='/login' element={
                            this.is_authenticated() ?
                                <div></div>
                                :
                                <LoginForm
                                    get_token={(username, password) => this.get_token(username, password)}/>
                        }/>}/>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}
                                                                            delete_project={(id) =>
                                                                                this.delete_project(id)}/>}/>
                        <Route exact path='/projects/create' element={<ProjectForm users={this.state.users}
                                                                           create_project={(name, resp_link, users) =>
                                                                                this.create_project(name, resp_link, users)}/>}/>
                        <Route exact path='/todo' element={<TodoList todoArticles={this.state.todoArticles}/>}/>
                        <Route path="/projects/:name" element={<ProjectListDetail projects={this.state.projects}/>}/>
                        <Route path="/users" element={<Navigate to="/"/>}/>
                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>
                    <footer>
                        <p>Подвал</p>
                    </footer>
                </BrowserRouter>
            </div>
            </body>
        )

    }


}


export default App;
