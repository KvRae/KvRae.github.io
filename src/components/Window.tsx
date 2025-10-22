// src/components/Window.tsx
import { useState, useEffect } from 'react';
import * as React from "react";

interface WindowProps {
    title: string;
    url?: string; // optional iframe
    children?: React.ReactNode; // optional JSX content
    onClose: () => void;
}

export default function Window({ title, url, children, onClose }: WindowProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (dragging) setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseUp = () => setDragging(false);

    useEffect(() => {

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, offset]);

    return (
        <div
            className="absolute bg-gray-900 border border-gray-700 shadow-lg rounded w-1/2 h-1/2 overflow-hidden"
            style={{ top: position.y, left: position.x, zIndex: 50 }}
        >
            {/* Mac-style title bar */}
            <div
                className="flex items-center justify-between bg-gray-800 px-2 py-1 cursor-move"
                onMouseDown={handleMouseDown}
            >
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose}></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-white text-sm font-semibold">{title}</span>
                <div className="w-4"></div>
            </div>

            {/* Window content */}
            {children ? children : url ? <iframe src={url} className="w-full h-full border-none" /> : null}
        </div>
    );
}
