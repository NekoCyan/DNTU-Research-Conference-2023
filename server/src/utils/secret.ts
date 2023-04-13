import dotenv from 'dotenv';

export default () => {
	let loadedPath = "root"; // Path of env file Loaded.

	// Load from root folder.
	let dotenvConfig = dotenv.config();

	// If error, load from secret folder in src folder.
	const secretEnv = './src/secret/.env';
	if (dotenvConfig.error instanceof Error) {
		dotenvConfig = dotenv.config({ path: secretEnv });
		loadedPath = secretEnv;
	}

	// If error again, force User to set env File.
	if (dotenvConfig.error instanceof Error) {
		throw new Error(
			'.env file is missing. Please create one in the root folder or in the secret folder of src folder.',
		);
	} else {
		console.log(`.env file Loaded from "${loadedPath}".`);
	}
};
