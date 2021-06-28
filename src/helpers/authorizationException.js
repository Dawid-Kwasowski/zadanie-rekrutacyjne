const authorizationException = (res) => {

	if(res.status === 401) {

		localStorage.removeItem('jwt');

		location.reload(true);

	}

}

export default authorizationException;