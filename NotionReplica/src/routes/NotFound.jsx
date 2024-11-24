import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="notFound text-center mt-20">
            <h1 className="text-6xl text-gray-800">404</h1>
            <h3 className="text-xl text-gray-600">The page is not found</h3>
            <p className="text-gray-700 mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium dicta officia error laboriosam. Ex culpa facilis vitae aspernatur in fugiat eveniet voluptates, dolore eaque ab. Veritatis aspernatur amet enim praesentium.
            </p>
            <p className="text-gray-800 mt-4">Go to the <Link to="/" className="text-blue-600 underline">main page</Link></p>
        </div>
    );
}

export default NotFound;