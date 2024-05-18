document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '7fa1b07c579082b087b0ae3f285e2668';
    const API_URL = 'https://api.themoviedb.org/3';

    const fetchTopPopularMovies = async () => {
        try {
            const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
            const data = await response.json();
            displayTopPopularMovies(data.results);
        } catch (error) {
            console.error('Error fetching top popular movies:', error);
        }
    };

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
            const data = await response.json();
            displayItems(data.results, 'movie-list');
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const fetchSeries = async () => {
        try {
            const response = await fetch(`${API_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
            const data = await response.json();
            displayItems(data.results, 'series-list');
        } catch (error) {
            console.error('Error fetching TV shows:', error);
        }
    };

    const fetchTopTrendingMovies = async () => {
        try {
            const response = await fetch(`${API_URL}/trending/movie/week?api_key=${API_KEY}`);
            const data = await response.json();
            displayTopTrendingMovies(data.results);
        } catch (error) {
            console.error('Error fetching top trending movies:', error);
        }
    };

    const fetchMovieDetails = async (movieId) => {
        try {
            const response = await fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
            const data = await response.json();
            showModal(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    const displayTopPopularMovies = (movies) => {
        const slider = document.getElementById('slider');
        movies.slice(0, 3).forEach(movie => {
            const slide = document.createElement('div');
            slide.className = 'flex-none w-full';
            slide.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-auto">
            `;
            slider.appendChild(slide);
        });

        let currentSlide = 0;
        const slides = slider.querySelectorAll('.flex-none');
        const totalSlides = slides.length;

        setInterval(() => {
            slides[currentSlide].style.marginLeft = '-100%';
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].style.marginLeft = '0';
        }, 3000);
    };

    const displayItems = (items, containerId) => {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear previous content
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer';
            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title || item.name}" class="rounded-lg mb-4 w-full h-64 object-cover">
                <h3 class="text-xl font-semibold">${item.title || item.name}</h3>
            `;
            card.addEventListener('click', () => fetchMovieDetails(item.id));
            container.appendChild(card);
        });
    };

    const showModal = (movie) => {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = `
            <button id="modal-close" class="absolute top-2 right-2 text-white text-2xl">&times;</button>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="rounded-lg mb-4 w-full h-64 object-cover">
            <h3 class="text-2xl font-semibold mb-2">${movie.title}</h3>
            <p><strong>Duration:</strong> ${movie.runtime} minutes</p>
            <p><strong>Overview:</strong> ${movie.overview}</p>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
        `;
        modal.classList.remove('hidden');

        const closeModal = () => {
            modal.classList.add('hidden');
        };

        document.getElementById('modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    };

    // Event listener for mobile menu toggle
    document.getElementById('menu-button').addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    });

    // Fetch and display content
    fetchTopPopularMovies();
    fetchMovies();
    fetchSeries();
    fetchTopTrendingMovies();
});
