import React from "react";

interface ShowSelectorProps {
    selected: string;
    onChange: (value: string) => void;
    options: string[];
}

export const ShowSelector: React.FC<ShowSelectorProps> = ({
    selected,
    onChange,
    options
}) => {
    return (
        <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded shadow-md"
        >
            <option value="">-- Selecciona una función --</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    );
};
