import { NavLink } from "react-router-dom";

interface AsideLinksProps {
    title: string;
    children: React.ReactNode;
    to: string;
    onClick?: () => void
}

export default function AsideLinks({ title, children, to, onClick }: AsideLinksProps) {
    return (
        <li onClick={onClick}>
            <NavLink to={to} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary-900 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                    {children}
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">{title}</span>
            </NavLink>
        </li>
    );
}