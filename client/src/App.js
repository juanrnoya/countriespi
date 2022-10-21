/** @format */

import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";

function App() {
   return (
      <Router>
         <div className='App'>
            <Route exact path='/' component={Home} />
            <Route exact path='/form' component={Form} />
         </div>
      </Router>
   );
}

export default App;
