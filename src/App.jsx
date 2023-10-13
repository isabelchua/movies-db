import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedGenre, setSelectedGenre] = useState("");
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		// Fetch genres data from the API
		axios
			.get("https://streaming-availability.p.rapidapi.com/genres", {
				headers: {
					"X-RapidAPI-Key":
						"e8a837f932msh64eef34d549516ap1a55bejsn0fa83d38dde5",
					"X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
				}
			})
			.then(response => {
				// Ensure genres data is present in the API response
				if (
					response.data.result &&
					typeof response.data.result === "object" &&
					Object.keys(response.data.result).length > 0
				) {
					setGenres(response.data.result);
				} else {
					console.error(
						"Genres data is missing or empty in the API response."
					);
				}
			})
			.catch(error => {
				console.error("Error fetching genres:", error);
			});
	}, []);

	useEffect(() => {
		// Only fetch movie data when a genre is selected
		if (!selectedGenre) {
			return;
		}

		const fetchData = async () => {
			const queryParams = {
				country: "us",
				services: "netflix"
				// show_type: "movie",
				// keyword: "zombie",
				// genres: selectedGenre
			};

			const url =
				"https://streaming-availability.p.rapidapi.com/search/filters";

			const options = {
				method: "GET",
				url,
				params: queryParams,
				headers: {
					"X-RapidAPI-Key":
						"e8a837f932msh64eef34d549516ap1a55bejsn0fa83d38dde5",
					"X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
				}
			};

			try {
				const response = await axios.request(options);
				// Filter out duplicate links for each movie
				const filteredMovies = response.data.result.map(movie => ({
					...movie,
					streamingInfo: {
						us: movie.streamingInfo.us.filter(
							(info, index, self) =>
								index === self.findIndex(i => i.link === info.link)
						)
					}
				}));
				console.log(filteredMovies);
				setMovies(filteredMovies);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [selectedGenre]);

	const handleGenreChange = event => {
		setSelectedGenre(event.target.value);
	};

	return (
		<div>
			<h1>Movies</h1>
			<label htmlFor="genreSelect">Select a Genre:</label>
			<select
				id="genreSelect"
				onChange={handleGenreChange}
				value={selectedGenre}
			>
				<option value="">All Genres</option>
				{Object.entries(genres).map(([id, name]) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</select>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<ul>
					{movies.map((movie, index) => (
						<li key={index}>{movie.title}</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default App;
