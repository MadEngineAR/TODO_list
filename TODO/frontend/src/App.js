import React from 'react';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import axios from 'axios'
import TodoList from "./components/Todo";
import {Route, BrowserRouter, Link, Routes, Navigate,} from "react-router-dom";
import ProjectListDetail from "./components/ProjectDetail";

const NotFound404 = () => {
    return (
    <div>
        <h1>Страница по адресу '{window.location.pathname}' не найдена</h1>
    </div>
    )
}

console.log(ProjectListDetail)
class App extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           'users': [],
           'projects': [],
           'todoArticles':[]
       };
   }

   componentDidMount() {
   axios.get('http://127.0.0.1:8000/api/authapp/').then(response => {
    const users = response.data;

        this.setState(
        {
            'users': users["results"],

        }
    )
    }).catch(error => console.log(error));

    axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
        let projects;
        projects = response.data;


        this.setState(
        {
            'projects': projects["results"],

        }
    );
    }).catch(function (error) {
        console.log(error);
    });

    axios.get('http://127.0.0.1:8000/api/todo/').then(response => {
        let todoArticles;
       todoArticles = response.data;

        this.setState(
        {
            'todoArticles': todoArticles["results"],

        }
    );
    }).catch(function (error) {
        console.log(error);
    });
    }

     render () {
       return (
           <body>
               <div>
                   <BrowserRouter>
                       <menu>
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
                           <Route exact path='/' element={<UserList users={this.state.users} />} />
                           <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />}/>
                           <Route exact path='/todo' element={<TodoList todoArticles={this.state.todoArticles} />}/>
                           <Route path="/projects/:name" element={<ProjectListDetail projects={this.state.projects} />}/>
                           <Route path="/users" element={ <Navigate to="/" /> } />
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
