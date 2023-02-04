import './App.css';
import "./components/Row"
import categories from "./api"
import Row from './components/Row';
import Banner from './components/Banner';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Banner/>

      {categories.map(category => {
        return <Row 
          key={category.name} 
          title ={category.title} 
          path={category.path}
          isLarge={category.isLarge}
          />      
      })}
      
      <footer>
        Built by Ideraldo <span role="img" aria-label='fogo'>🔥</span> <br/>
        Direitos de imagem Youtube e Netflix.<br/>
        Dados pegos do Youtube e TMDB.

      </footer>



    </div>
  );
}

export default App;
