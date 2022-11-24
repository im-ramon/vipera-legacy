interface DashboardStatProps {
    title: string;
    state: string | number
}

export default function DashboardStat({ title, state }: DashboardStatProps) {
    return (
        <div className={`border rounded-md py-4 px-4 text-right transition-all duration-300  hover:border-primary-900 select-none ${state > 0 ? 'bg-primary-200 border-primary-900 hover:border-secondary' : ''}`}>
            <p className='text-sm font-semibold'>{title}</p>
            <p className='text-2xl font-semibold text-right'>{state}</p>
        </div>
    );
}