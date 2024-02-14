import { useState } from 'react';
import './FilterImage.css';
import backgroundImage from './assets/ImgWeb.jpg';
import axios from 'axios';

function App() {
  const containerTopStyle = {
    background: `url(${backgroundImage}) center/cover no-repeat`,
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    
  };

  const ImageSearch = () => {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = 'ItSWcfIsnzPYCQ4eqe96Wn6XUHg7Kj50gQ13m7U6UuaNIZCc8xFXU92d';
    const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=50`;

    const handleSearch = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: apiKey,
          },
        });

        setImages(response.data.photos);
        setQuery('');
      } catch (error) {
        setError('Erro ao buscar imagens do Pexels. Tente novamente.');
        console.error('Erro ao buscar imagens do Pexels:', error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="container-fluid mt4- mb-4" style={{ margin: '0', padding: '0' }}>
        <div style={containerTopStyle  } className="mb-4">
          <h1 className="text-white mb-4">
            As melhores fotos profissionais gratuitas e imagens e vídeos livres de royalties que os criadores compartilharam.
          </h1>
          <div className="input-group" style={{ position: 'absolute', bottom: '170px', width: '600px' }}>
            <input
              placeholder="Pesquisar"
              type="search"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} className="btn btn-primary">
              Pesquisar
            </button>
          </div>
        </div>
        <div className="row justify-content-center" style={{ marginTop: '200px' }}>
          {loading ? <p>Carregando...</p> : error ? <p>{error}</p> : images.map((image) => (
            <div key={image.id} className="col-md-3 mb-3" style={{ margin: '10px 5px' }}>
              <img
                src={image.src.medium}
                alt={`Imagem por ${image.photographer}`}
                className="img-fluid"
             
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div >
      <ImageSearch />
    </div>
  );
}

export default App;
