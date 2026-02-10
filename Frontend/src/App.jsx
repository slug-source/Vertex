import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Problem from './pages/Problem';
import ProtectedRoute from './components/ProtectedRoute';
import CreateProblem from './pages/CreateProblem';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />


          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/problem/:id' element={<Problem />} />
            <Route path='problem/create' element={<CreateProblem />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
