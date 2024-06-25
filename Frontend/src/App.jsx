import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from './Components/Adduser/AddUser';
import EditUser from './Components/Updateuser/EditUser';
import AllDataFetch from './Components/Getuser/AllDataFetch';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AllDataFetch />}/>
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
