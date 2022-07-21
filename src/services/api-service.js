const API_KEY = '27792321-2960889e1be9eac4cb5e657cd';
const BASE_URL = 'https://pixabay.com/api';
const options = new URLSearchParams ({
    image_type: 'photo',
    orientation:'horizontal',
})

export const apiService = (searchValue, page, per_page) => {
return fetch(
    `${BASE_URL}/?q=${searchValue}&page=${page}&key=${API_KEY}&per_page=${per_page}&${options}`
)
    .then(response => {
    if (!response.ok) {
        Promise.reject(`Not foud`);
    }

    return response.json();
    })
    
}