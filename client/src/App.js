/** @format */

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import Error from "./components/Error/Error";
import Landing from "./components/Landing/Landing";
import Detail from "./components/Detail/Detail";

function App() {
   return (
      <Router>
         <div className='App'>
            <Switch>
               <Route exact path='/' component={Landing} />
               <Route exact path='/home' component={Home} />
               <Route exact path='/form' component={Form} />
               <Route path='/home/:id' component={Detail} />
               <Route path='*' component={Error} />
            </Switch>
         </div>
      </Router>
   );
}

export default App;
