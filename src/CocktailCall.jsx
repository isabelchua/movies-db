import React, { useEffect, useState } from "react";
import axios from "axios";

function CocktailCall() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const options = {
			method: "GET",
			url: "https://the-cocktail-db.p.rapidapi.com/search.php",
			params: { i: "vodka" },
			headers: {
				"X-RapidAPI-Key":
					"e8a837f932msh64eef34d549516ap1a55bejsn0fa83d38dde5",
				"X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com"
			}
		};

		async function fetchData() {
			try {
				const response = await axios.request(options);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);

	return (
		<div>
			<h1>Cocktail Data</h1>
			{data ? (
				<div>
					<h2>Data from the API:</h2>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
			) : (
				<p>Loading data...</p>
			)}
		</div>
	);
}

export default CocktailCall;
