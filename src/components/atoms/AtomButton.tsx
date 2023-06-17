import { type ReactElement } from "react";

interface Props {
    children: ReactElement
    onClick: () => void
}

export const AtomButton: React.FC<Props> = ({ children, onClick }) => {
    return (
        <button
            type="button"
            className="group ml-4 flex items-center justify-center rounded-md hover:text-gray-four bg-gray-four p-2 hover:bg-high-green focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-five"
            onClick={() => onClick()}
        >
            {children}
        </button >
    );
}