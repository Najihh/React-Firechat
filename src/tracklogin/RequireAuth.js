import firebaseApp from '../firebase/Firebase';

export default (nextState, replace) => {
	var user = firebaseApp.auth().currentUser;
  if (!user) {
    replace({
      pathname: '/loginsikek',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
