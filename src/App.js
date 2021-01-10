//es6
//var name = 'Mosh'; 
//var message = `Hi ${name},`;
//var message = `
//Hi ${name},
//<%- include("partials/header") %>
//Thank you for joining my mailing list. 

//Happy coding,
//Mosh
//`

//WHEN WE DO DYNAMIC SO WE USE {}  Example inside map..
import './App.css';
//import logo from './logo.svg';
import Main from './components/maincomponent';
import React,{Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import {browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
const STORE = ConfigureStore();
class App extends Component{
   render(){
    // returns view here not create expilict like ejs mbut here onlyy
   return(
      <Provider store={STORE}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
   );
   }
}

export default App;

// let elemnt=React.createElement("h1",
//{className="greeting"},
//"hellow world")
//import React from 'react';
//function App() {
 // return (
  // .....
 // );
//}

//fetch!!

/*
function App(){

[joke,setjoke]=useState()
[loading,setloading]=useState(true)
useEffect(()=>{
  const fetchJoke=async() =>{
   const data =await fetch("...")
   .then((res)=>{
    res.json()
   })
   setDATA(data
      setloading(false)
     }
  }
   
   fetchJoke();
  }
},[]);

if(isloading){
  
}
return(
...............
)
}
*/
