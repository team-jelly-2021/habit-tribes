import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import axios from 'axios';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const signup = async (email, password, name) => {
		try {
			const userCredential = await auth.createUserWithEmailAndPassword(email, password);
			const user = userCredential.user;

			const updated = await user.updateProfile({displayName: name});
			console.log(user);
			return await axios.post('/api/register', {
			uid: user.uid,
			fullName: user.displayName,
			email: user.email
			});


		} catch (e) {
			console.log(e);
		}
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	// Still need to create the handleUser function

	// function signinWithGitHub () {
	// 		setLoading(true);
	// 		return firebase
	// 			.auth()
	// 			.signInWithPopup(new firebase.auth.GithubAuthProvider())
	// 			.then((response) => handleUser(response.user));
	// 	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
