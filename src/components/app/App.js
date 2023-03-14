
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';
import Page404 from '../pages/Page404';
import SingleItemPage from '../pages/SingleItemPage';

const App=()=> {
  return (
    <div className="app">
      <Router>
          <AppHeader />
          <main>
              <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/comics' element={<ComicsPage/>}/>
                <Route path='/comics/:comicId' element={<SingleItemPage param='comicId'/>}/>
                <Route path='/:name' element={<SingleItemPage param='name'/>}/>
                <Route exact path='*' element={<Page404 />}/>
             </Routes>
          </main>

      </Router>
      
    </div>
  );
  
}

export default App;
