import ReactDOM  from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { GoogleOAuthProvider} from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId='264262333696-aps0nde042014ba5aflo5cjjborvorgi.apps.googleusercontent.com'>
    <BrowserRouter>
        <QueryProvider>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </QueryProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
)