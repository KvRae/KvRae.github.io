interface PacmanWindowProps {
    onClose: () => void;
}

export default function PacmanWindow(
    { onClose }: PacmanWindowProps
) {
    return (
        // 1. Full Viewport Coverage: 'fixed inset-0' already covers the screen.
        //    'bg-transparent bg-opacity-50' is fine for a slight overlay.
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50 p-0">

            {/* 2. Main Window Container: Change 'max-w-sm' to 'w-full' and 'h-full'
                 to take up all available space. The 'p-4' from the parent is moved
                 to the content area to keep the window flush with edges. */}
            <div className="bg-gray-900 shadow-lg w-full h-full text-white flex flex-col">

                {/* Window header: Keep this static height. */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 flex-shrink-0">
                    <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose}></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-2 font-semibold">Kav-Man</span>
                </div>

                {/* 3. Content Area: Use 'flex-grow' to make this div take up all remaining vertical space.
                     Remove 'items-center' and 'space-y-4' to let the content fill the area. */}
                <div className="p-0 flex-grow">
                    <iframe
                        src="https://kvrae.github.io/Pac-man/"
                        title="Embedded Website"
                        // 4. iframe: Set both width and height to 100% to fill the new parent div.
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}