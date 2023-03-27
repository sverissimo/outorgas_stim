import { Navigate } from "react-router-dom";
import { getCookie } from "./auth/utils/manageCookies";

export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
    outlet: JSX.Element;
};

export default function ProtectedRoute({ authenticationPath, outlet }: ProtectedRouteProps) {
    const isAuthenticated = getCookie('isLoggedIn') === 'true';
    if (!!isAuthenticated) {
        return outlet;
    } else {
        return <Navigate to={{ pathname: authenticationPath }} />;
    }
};
