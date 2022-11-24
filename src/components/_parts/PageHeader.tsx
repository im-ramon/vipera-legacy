interface PageHeaderProps {
    title: string;
    subtitle?: string | null;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <>
            <h2 className="text-4xl font-extrabold text-black text-left">{title}</h2>
            {subtitle && <p className="my-4 text-md text-gray-500 text-left">{subtitle}</p>}
        </>
    );
}