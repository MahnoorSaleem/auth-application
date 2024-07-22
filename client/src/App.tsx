import { AuthProvider } from './context/AuthContext';
import Routes from './routes';

const App = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
);

export default App;
