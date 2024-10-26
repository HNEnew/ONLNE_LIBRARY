import AdminLogin from "./components/Forms/AdminLogin";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Authors from "./components/Authors/Authors";
import Books from "./components/Books/Books";

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
      <Sidebar/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/adminlogin" element={<AdminLogin/>}/>
          <Route path="/authors" element={<Authors/>}/>
          <Route path="/books" element={<Books/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
