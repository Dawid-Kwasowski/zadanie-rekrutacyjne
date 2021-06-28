export default function authHeader() {

	const jwt = JSON.parse(localStorage.getItem('jwt'));

	return jwt && jwt.user && jwt.token ? { 'Authorization': `Bearer ${jwt.token}` } : {};

}