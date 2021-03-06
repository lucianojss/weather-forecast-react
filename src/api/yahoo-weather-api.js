const API_URL = 'https://query.yahooapis.com/v1/public/yql';

/**
 * Get weather forecast for 5 days by location
 *
 * @param {String} location
 * @param {Boolean} unit
 */
const getForecast = async (location, unit = true) => {

	const url = new URL(API_URL);
	const u = unit ? 'c' : 'f';
	const q = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${location}") and u="${u}"`;
	const params = {
		format: 'json',
		q
	}

	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

	const response = await fetch(url);

	if (!response.ok) {
		throw response;
	}

	return await response.json();
};

export {
	getForecast
};