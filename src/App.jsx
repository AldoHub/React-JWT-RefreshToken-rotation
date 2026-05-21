import _Routes from './routes';
import { Link } from 'react-router';

function App() {
 
  return (
    <>
      <h1>App</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/auth/login">Login</Link></li>
          <li><Link to="/auth/register">Register</Link></li>
          <li><Link to="/users">Users</Link></li>
        
          
        </ul>
      </nav>
      <_Routes/>
    </>
  )
}

export default App
