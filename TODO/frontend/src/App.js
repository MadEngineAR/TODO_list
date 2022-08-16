import React from 'react';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import axios from 'axios'
import TodoList from "./components/Todo";


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
        console.log(todoArticles)

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
                   <menu>
                        <li>Автор</li>
                        <li>Проект</li>
                        <li>TODO</li>
                   </menu>
                   <UserList users={this.state.users} />
                   <ProjectList projects={this.state.projects} />
                   <TodoList todoArticles={this.state.todoArticles} />
                   <footer>
                        <p>Подвал</p>
                   </footer>
               </div>
           </body>
       )

   }
}



export default App;
//import logo from './logo.svg';
//import './App.css';
//
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}

//export default App;
