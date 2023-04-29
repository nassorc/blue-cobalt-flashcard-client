// set number of daily review cards here
// set number of daily new cards
import { useState, createContext } from 'react';

const ReviewSettingContext = createContext();

export const ReviewSettingProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        reviewLimit: 10,
        newLimit: 5,
    });
    return (
        <ReviewSettingContext.Provider value={{settings, setSettings}} >
            {children}
        </ReviewSettingContext.Provider>
    )
};

export default ReviewSettingContext