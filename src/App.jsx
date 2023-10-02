import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const queryParams = {
				country: "us",
				services: "netflix",
				show_type: "movie",
				genres: "28",
				keyword: "zombie"
			};

			const queryString = Object.keys(queryParams)
				.map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
				.join("&");

			const url = `https://streaming-availability.p.rapidapi.com/search/ultraviolet?${queryString}`;

			const options = {
				method: "GET",
				url,
				headers: {
					"X-RapidAPI-Key":
						"e8a837f932msh64eef34d549516ap1a55bejsn0fa83d38dde5",
					"X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
				}
			};

			try {
				const response = await axios.request(options);
				setMovies(response.data.results);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>Movies</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<ul>
					{movies.map(movie => (
						<li key={movie.id}>
							<strong>Title:</strong> {movie.title}
							<br />
							<strong>Year:</strong> {movie.year}
							<br />
							{/* Add more movie details here */}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default App;
