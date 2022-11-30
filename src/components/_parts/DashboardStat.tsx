interface DashboardStatProps {
    title: string;
    state: string | number;
    colorize?: boolean
}

export default function DashboardStat({ title, state, colorize }: DashboardStatProps) {
    return (
        <div className={`border dark:border-gray-600 rounded-md py-4 px-4 text-right transition-all duration-300 shadow-md hover:border-primary-900 dark:hover:border-primary-900 select-none ${(state > 0 && colorize) ? 'bg-primary-50 dark:bg-primary-800 dark:border-primary-900 dark:hover:border-white' : ''}`}>
            <p className='text-sm font-semibold'>{title}</p>
            <p className='text-2xl font-semibold text-right'>{state}</p>
        </div>
    );
}