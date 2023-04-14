import { useState, createContext } from 'react';

const AuthContext = createContext();

// provider provides the information to the components
export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});
    
	return (
		<AuthContext.Provider value={{auth, setAuth}} >
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;