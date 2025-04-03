const LoadingDescription = () => {
    return (
        <div className="grid min-h-full place-items-center px-6 py-20 sm:py-20 lg:px-8">
            <p className="text-center">Loading your story</p>
            <span className="loading loading-dots loading-md"></span>
            <p className="text-center text-sm mt-2">It's less than 10 seconds!</p>
            
        </div>
    );
};

export default LoadingDescription;