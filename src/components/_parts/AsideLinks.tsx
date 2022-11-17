interface AsideLinksProps {
    title: string;
    children: React.ReactNode;
    onClick?: () => void
}

export default function AsideLinks({ title, children, onClick }: AsideLinksProps) {
    return (
        <li onClick={onClick}>
            <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                    {children}
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">{title}</span>
            </a>
        </li>
    );
}