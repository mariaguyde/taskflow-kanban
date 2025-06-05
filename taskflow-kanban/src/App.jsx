import Table from './components/Table/Table';
import CreateAccount from './components/CreateAccount/Createaccount';
import Login from './components/Login/Login';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/createaccount" element={<CreateAccount />} />
                <Route path="/tasks" element={<Table />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
