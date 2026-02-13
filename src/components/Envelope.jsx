import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Envelope({ onOpen }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        setTimeout(() => {
            onOpen();
        }, 3000); // Wait for animation to finish before switching view
    };

    return (
        <div className="flex items-center justify-center w-full h-[50vh] cursor-pointer" onClick={handleOpen}>
            <div className="relative w-64 h-48 sm:w-80 sm:h-60">

                {/* Envelope Body */}
                <motion.div
                    className="absolute bottom-0 w-full h-full bg-red-500 rounded-lg shadow-xl z-10"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-red-600 rounded-lg opacity-20"></div>
                </motion.div>

                {/* Envelope Flap (Top) */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-1/2 bg-red-600 origin-top z-20 rounded-t-lg"
                    style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                    animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                ></motion.div>

                {/* Letter Inside */}
                <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 bg-white w-[90%] h-[90%] bottom-2 rounded p-4 flex flex-col items-center justify-center shadow-sm z-0"
                    animate={isOpen ? { y: -200, opacity: 1, zIndex: 10 } : { y: 0, opacity: 0, zIndex: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <p className="text-red-500 font-bold text-lg">For You ❤️</p>
                    <p className="text-gray-400 text-xs">Tap to read...</p>
                </motion.div>



                <div className="absolute -bottom-12 w-full text-center text-red-400 font-bold animate-pulse">
                    {isOpen ? "Opening..." : "Tap to open!"}
                </div>
            </div>
        </div>
    );
}
