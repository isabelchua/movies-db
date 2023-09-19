import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			// Define the query parameters
			const queryParams = {
				country: "us",
				services: "netflix",
				show_type: "movie",
				genres: "28",
				keyword: "zombie"
			};

			// Convert the query parameters to a query string
			const queryString = Object.keys(queryParams)
				.map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
				.join("&");

			// Construct the API URL with the query string
			const url = `https://streaming-availability.p.rapidapi.com/countries?${queryString}`;

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
				console.log(response.data);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	// Render the data object as key-value pairs
	const renderData = () => {
		if (!data) return null;

		return (
			<ul>
				{Object.entries(data).map(([key, value], index) => (
					<li key={index}>
						<strong>{key}:</strong> {value}
					</li>
				))}
			</ul>
		);
	};
}

export default App;
