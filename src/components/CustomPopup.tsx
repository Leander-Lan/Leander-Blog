import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface CustomPopupProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    type: "success" | "error";
    title?: string;
}

export default function CustomPopup({ isOpen, onClose, message, type, title }: CustomPopupProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0c0c0c] border border-slate-800 rounded-2xl p-8 z-[10000] shadow-2xl overflow-hidden"
                    >
                        {/* Geeky background elements */}
                        <div className="absolute inset-0 pointer-events-none opacity-20"
                             style={{
                                 backgroundImage: `radial-gradient(${type === 'success' ? '#22c55e' : '#ef4444'} 1px, transparent 1px)`,
                                 backgroundSize: '20px 20px'
                             }}
                        />
                        <div className={`absolute top-0 left-0 w-full h-1 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} shadow-[0_0_10px_rgba(34,197,94,0.5)]`} />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className={`mb-4 p-4 rounded-full ${type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {type === 'success' ? (
                                    <CheckCircle size={48} className="animate-pulse" />
                                ) : (
                                    <XCircle size={48} className="animate-pulse" />
                                )}
                            </div>

                            <h2 className="text-xl font-bold text-white mb-2 tracking-wider">
                                {title || (type === 'success' ? '系统提示' : '系统错误')}
                            </h2>
                            
                            <p className="text-gray-300 mb-8 font-mono text-sm leading-relaxed">
                                {message}
                            </p>

                            <button
                                onClick={onClose}
                                className={`w-full py-3 rounded-lg font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] 
                                    ${type === 'success' 
                                        ? 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                                        : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                                    }`}
                            >
                                {type === 'success' ? '确定' : '关闭'}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
