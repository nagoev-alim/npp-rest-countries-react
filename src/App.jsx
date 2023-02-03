import { AppWrapper, Countries } from './components/index.js';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppWrapper>
      <Countries />
    </AppWrapper>
  </QueryClientProvider>
);

export default App;
