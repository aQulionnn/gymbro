import {BrowserRouter, Route, Routes} from "react-router-dom"
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import ProductsPage from "./pages/SportsNutritionPage";
import VideoPage from "./pages/VideoPage";
import SportsNutritionPage from "./pages/SportsNutritionPage";
import LoginPage from "./pages/LoginPage";
import MainAdminPage from "./pages/MainAdminPage";
import SportsNutritionAdminPage from "./pages/SportsNutritionAdminPage";
import VideoAdminPage from "./pages/VideoAdminPage";
import SportProductPage from "./pages/SportProductPage";
import SportProductAdminPage from "./pages/SportProductAdminPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/post/:postid" element={<PostPage/>}/>
          <Route path="/sportpit" element={<SportsNutritionPage/>}/>
          <Route path="/videos" element={<VideoPage/>}/>
          <Route path='/products' element={<SportProductPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/admin" element={<MainAdminPage/>}/>
          <Route path="/admin/sportpit" element={<SportsNutritionAdminPage/>}/>
          <Route path="/admin/videos" element={<VideoAdminPage/>}/>
          <Route path='/admin/products' element={<SportProductAdminPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
