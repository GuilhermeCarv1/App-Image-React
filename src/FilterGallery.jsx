import React, { useState, useEffect } from 'react';
import { createClient } from 'axios';

const ImageGallery = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // Substitua 'SUA_CHAVE_API' pela sua chave de API do Pexels
                const apiKey = 'SItSWcfIsnzPYCQ4eqe96Wn6XUHg7Kj50gQ13m7U6UuaNIZCc8xFXU92d';
                const response = await axios.get('https://api.pexels.com/v1/', {
                    headers: {
                        Authorization: apiKey,
                    },
                    params: {
                        per_page: 5,  // Altere o número conforme necessário
                    },
                });

                setPhotos(response.data.photos);
            } catch (error) {
                console.error('Erro ao buscar fotos:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div>
            <h1>Imagens da API Pexels</h1>
            <div>
                {photos.map((photo) => (
                    <img key={photo.id} src={photo.src.medium} alt={photo.photographer} />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
