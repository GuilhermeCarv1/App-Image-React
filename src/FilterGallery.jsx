
import React, { useState } from 'react';
import axios from 'axios';

const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const apiKey = 'YOUR_PEXELS_API_KEY';
  const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;

  const handleSearch = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: apiKey,
        },
      });

      setImages(response.data.photos);
    } catch (error) {
      console.error('Error fetching images from Pexels:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite uma palavra-chave..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Pesquisar</button>

      <div>
        {images.map((image) => (
          <img key={image.id} src={image.src.medium} alt={image.url} />
        ))}
      </div>
    </div>
  );
};

export default FilterGallery;
