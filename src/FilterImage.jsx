import { useState } from 'react';
import './FilterImage.css';
import backgroundImage from './assets/ImgWeb.jpg';
import axios from 'axios';


// ... (imports permanecem os mesmos)

function App() {
  const [count, setCount] = useState(0);
  const containerTopStyle = {
    background: `url(${backgroundImage}) center/cover no-repeat`,
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const ImageSearch = () => {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = 'ItSWcfIsnzPYCQ4eqe96Wn6XUHg7Kj50gQ13m7U6UuaNIZCc8xFXU92d';
    const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;

    const handleSearch = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: apiKey,
          },
        });

        setImages(response.data.photos);
        setQuery(''); // Limpar campo de pesquisa após uma pesquisa bem-sucedida
      } catch (error) {
        setError('Não encontramos nenhum resultado.');
        console.error('Erro ao buscar imagens do Pexels:', error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="containerInfo">
        <h1>
          As melhores fotos profissionais gratuitas e imagens e vídeos livres de royalties que os criadores compartilharam.
        </h1>

        <div className="group">
          <button onClick={handleSearch} className="search-button">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 
                    9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 
                    11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          </button> 
          <input
            placeholder="Pesquisar"
            type="search"
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }} 
          />
          </div>
           
            <div className="image-grid">
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && images.map((image) => (
              <img
                key={image.id}
                src={image.src.medium}
                alt={`Imagem por ${image.photographer}`}
                className="image"/>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div style={containerTopStyle}>
      <ImageSearch />
    </div>
  );
}

export default App;
