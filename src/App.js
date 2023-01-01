import AddUser from './component/AddUser';
import './App.css';
import UserList from './component/UserList';
import {Route,Routes,Link} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <nav className="nav  justify-content-around ">
         <Link className="nav-link border border-primary" to="adduser">AddUser</Link>
         <Link className="nav-link border border-primary" to="userlist">DisplayUser</Link>
     </nav>
     <Routes>
      <Route path='adduser'  element={<AddUser/>}/>
      <Route path='userlist' element={<UserList/>}/>
     </Routes>
    </div>
  );
}

export default App;
