import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import MealPage from "./pages/MealPage/MealPage";
function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' Component={MainPage}/>
        <Route path="/meal/:mealId" Component={MealPage} />
      </Routes>
    </>
  );
}

export default App;