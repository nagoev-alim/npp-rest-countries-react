import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { DetailPage, Header, HomePage } from './index.js';

const Countries = () => {
  return <div className='countries'>
    <Router>
      <Header/>
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' exact element={<HomePage/>}/>
            <Route path='/country/:name' exact element={<DetailPage/>}/>
          </Routes>
        </div>
      </main>
    </Router>
  </div>;
};

export default Countries;
