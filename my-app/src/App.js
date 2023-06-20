import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';
import News from './components/News';
import Contact from './components/Contact';
import {Route, withRouter, Switch } from "react-router-dom";
import Booklist from './components/BookList';
import BookForm from './components/BookForm';
import {Suspense} from 'react'
import Test from './components/Test';


function App() {
  return (
    <>
    <div>
    
    <Suspense fallback={
          <div className="w-100 align-items-center justify-content-center mt-4 d-flex">
            ...
          </div>}>
    <Sidebar/>
    <Navbar/>
    <Switch>
          <Route exact path="/" component={Test} />
          <Route exact path="/news" component={News} />
          <Route exact path="/bookform" component={BookForm} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/editform/:id"  component={BookForm} />
          <Route exact path="/bookList/" component={Booklist} />
        </Switch>
        </Suspense>
        </div>
    </>
  );
}

export default withRouter(App);
