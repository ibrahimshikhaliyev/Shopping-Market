import Navbar from '../navbar/Navbar';
import SneakerList from '../sneakerList/SneakerList';
import MenProductList from '../menProducts/MenProducts';
import SideMenu from '../sideMenu/SideMenu';
import { BrowserRouter ,Route,Routes } from 'react-router-dom';
import './App.scss';



const  App=(props)=> {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar/>
        <div className="sideMenu">
          <SideMenu/>
        </div>


        <Routes>
            <Route path="/" element={<SneakerList/>}/>
            <Route path="/men" element={<MenProductList category_id={'mensshoes101'}/>}/>
            <Route path="/women" element={<MenProductList category_id={'womensshoes102'}/>}/>

        </Routes>
      
    </div>
    </BrowserRouter>
  
    
  );
}

export default App;


