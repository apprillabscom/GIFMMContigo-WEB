import logo from './logo.svg';
import './App.css';
import AuthState from './app-context';
import Homepage from './Pages/HomePage'
function App() {
  return (
    <AuthState>
      <Homepage />
    </AuthState>
  );
}

export default App;
