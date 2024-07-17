import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div className="h-screen w-full">
            Dang!
        </div>
    )
}

export default ErrorBoundary;