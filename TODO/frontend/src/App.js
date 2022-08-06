import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import axios from 'axios'


class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': []
       }
   }

   componentDidMount() {
   axios.get('http://127.0.0.1:8000/api/authapp/').then(response => {
    const users = response.data
        this.setState(
        {
            'users': users
        }
    )
    }).catch(error => console.log(error))
    }

   render () {
       return (
           <body>
               <div font-size = "large">
                   <menu>
                        <li>Автор</li>
                        <li>Проект</li>
                        <li>TODO</li>
                   </menu>
                   <UserList users={this.state.users} />
                   <footer>
                        <p>Подвал</p>
                   </footer>
               </div>
           </body>)

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
