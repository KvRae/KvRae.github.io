import './App.css'
import SignInScreen from "./pages/SignInScreen.tsx";
import BootScreen from "./pages/BootScreen.tsx";
import {useState} from "react";

export default function App() {
    const [booted, setBooted] = useState(false);

    return (
        <>
            {!booted ? (
                <BootScreen onFinish={() => setBooted(true)} />
            ) : (
                <SignInScreen />
            )}
        </>
    );
}
