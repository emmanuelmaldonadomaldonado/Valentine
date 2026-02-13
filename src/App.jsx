import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Envelope from "./components/Envelope";
import usImage from "./assets/us.jpg"; // Import the image

function App() {
    const [step, setStep] = useState("envelope"); // envelope, question, accepted
    const [noCount, setNoCount] = useState(0);

    const handleOpenEnvelope = () => {
        setStep("question");
    };

    const handleYesClick = () => {
        setStep("accepted");
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFC0CB", "#FF0000", "#FFFFFF"],
            emojis: ["❤️", "💖", "💋", "🍓"],
        });
    };

    const handleNoClick = () => {
        setNoCount(noCount + 1);
    };

    const phrases = [
        "No",
        "Are you sure?",
        "Really sure?",
        "Think again!",
        "Last chance!",
        "Surely not?",
        "You might regret this!",
        "Give it another thought!",
        "Are you absolutely certain?",
        "This could be a mistake!",
        "Have a heart!",
        "Don't be so cold!",
        "Change of heart?",
        "Wouldn't you reconsider?",
        "Is that your final answer?",
        "You're breaking my heart ;(",
        "You're breaking my heart ;(",
        "You're breaking my heart ;(",
        "You're breaking my heart ;(",
        "Sabes que no tienes opción 😈",
    ];

    const getNoButtonText = () => {
        return phrases[Math.min(noCount, phrases.length - 1)];
    };

    // Background floating elements
    const floatingElements = Array(20).fill(null).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * 5,
        scale: 0.5 + Math.random(),
    }));

    return (
        <div className="relative w-full h-[100dvh] overflow-hidden bg-gradient-to-br from-[#1a0b0f] via-[#2d1218] to-[#1a0b0f] text-pink-200 font-sans flex flex-col justify-center items-center">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingElements.map((el) => (
                    <motion.div
                        key={el.id}
                        className="absolute text-pink-500/20 text-4xl"
                        initial={{ x: `${el.x}vw`, y: `110vh`, opacity: 0 }}
                        animate={{
                            y: `-10vh`,
                            opacity: [0, 1, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: el.duration,
                            repeat: Infinity,
                            delay: el.delay,
                            ease: "linear"
                        }}
                        style={{ scale: el.scale }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>

            <AnimatePresence mode="wait">

                {step === "envelope" && (
                    <motion.div
                        key="envelope"
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="z-10"
                    >
                        <Envelope onOpen={handleOpenEnvelope} />
                    </motion.div>
                )}

                {step === "question" && (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="relative z-10 w-full max-w-2xl px-4"
                    >
                        {/* Glassmorphism Card */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 sm:p-12 flex flex-col items-center text-center relative overflow-hidden">
                            {/* Card Glow Effect */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-24 bg-red-500/20 blur-3xl rounded-full -z-10"></div>

                            <motion.div
                                className="mb-8 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-400/80"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            >
                                <img
                                    src={usImage}
                                    alt="Us Together"
                                    className="w-64 sm:w-80 h-auto object-cover rounded-2xl"
                                />
                            </motion.div>

                            <h1 className="text-4xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-pink-500 to-red-400 mb-8 drop-shadow-sm tracking-tight leading-tight">
                                Will you be my Valentine? 🌹
                            </h1>

                            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
                                <motion.button
                                    onClick={handleYesClick}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative bg-gradient-to-br from-rose-500 to-pink-600 text-white font-bold rounded-2xl shadow-[0_4px_15px_rgba(255,0,0,0.3)] transition-all overflow-hidden group"
                                    style={{
                                        fontSize: `${Math.min(noCount * 0.5 + 1.25, 3)}rem`,
                                        padding: `${Math.min(noCount * 0.5 + 1, 2)}rem ${Math.min(noCount * 0.5 + 2, 4)}rem`
                                    }}
                                >
                                    <span className="relative z-10">Yes 🤍</span>
                                    {/* Button Shine Effect */}
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </motion.button>

                                {noCount < phrases.length && (
                                    <motion.button
                                        onClick={handleNoClick}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-pink-200 text-xl font-semibold rounded-2xl shadow-lg hover:bg-white/20 hover:text-white transition-all"
                                    >
                                        {getNoButtonText()}
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === "accepted" && (
                    <motion.div
                        key="accepted"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                        className="flex flex-col items-center justify-center h-full text-center px-4 relative z-10"
                    >
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-10 max-w-2xl w-full flex flex-col items-center">
                            <h1 className="text-5xl sm:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600 mb-8 drop-shadow-sm">
                                YAYYY!!! 🎉 <br /> Te amoou! ❤️
                            </h1>

                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-pink-500/50 mb-8">
                                <img
                                    src="https://media.tenor.com/7KYg5e3kQcEAAAAi/peach-goma.gif"
                                    alt="Celebration Kiss"
                                    className="w-full max-w-sm object-cover"
                                />
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="text-2xl text-pink-200 font-medium"
                            >
                                Gracias por hacerme tan feliz! 🌹
                            </motion.p>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}

export default App;
