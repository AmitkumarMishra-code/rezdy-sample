import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./Home"
import Inventory from "./Inventory"
import Products from "./Products"
export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/products'>
                    <Products />
                </Route>
                <Route exact path='/products/:id' component = {Inventory}/>
            </Switch>
        </Router>
    )
}
