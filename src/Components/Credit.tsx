const Credits = () => {
    return (
        <div className="flex bg-white justify-center w-[50rem] items-center h-fit p-3 rounded-lg overflow-hidden text-black">
            <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold mb-8">Department of Computer Applications</h1>
                <h2 className="text-4xl font-bold mb-8">Intra Hackathon - 2k24</h2>
                <p className="text-xl mb-2 font-bold">Technologies Used</p>
                <ul className="list-none">
                    <li className="mb-1">React(Vite)</li>
                    <li className="mb-1">Tailwind CSS</li>
                    <li className="mb-1">Firebase</li>
                    {/* Add more thanks as needed */}
                </ul>
            </div>
        </div>
    );
};

export default Credits;
