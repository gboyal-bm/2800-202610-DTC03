import React, { useState } from "react";

interface FloatingButtonProps {
    contents: React.ReactNode; // The component to show when open
    icon?: string;
}

export function FloatingButton({ contents, icon = "+" }: FloatingButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {isOpen && (
                <div className="w-80 sm:w-96 animate-in slide-in-from-bottom-5 duration-300">
                    {contents}
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full bg-blue-600 text-2xl text-white shadow-lg transition-transform hover:scale-110 active:scale-95 flex items-center justify-center"
            >
                {isOpen ? "✕" : icon}
            </button>
        </div>
    );
}
