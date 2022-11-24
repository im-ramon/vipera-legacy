import { useEffect } from 'react';
import PageHeader from '../components/_parts/PageHeader';
import DashboardStat from '../components/_parts/DashboardStat';

export default function Dashboard() {
    useEffect(() => {
        document.title = 'Vipera | Dashboard'
    }, [])

    return (
        <>
            <PageHeader title='Dashboard' subtitle='Um resumo dos dados estatísticos dos visitantes.' />
            <div className='grid-cols-5 grid gap-3'>
                <DashboardStat title='Visitantes presentes' state={0} />
                <DashboardStat title='Visitantes cadastrados' state={0} />
                <DashboardStat title='Visitas esse mês' state={0} />
                <DashboardStat title='Visitas esta semana' state={0} />
                <DashboardStat title='Média de permanência' state={'0 min'} />
            </div>
            <div className='grid-cols-5 grid gap-3 mt-3 bg-green-300'>
                <DashboardStat title='Visitantes presentes' state={0} />
                <DashboardStat title='Visitantes cadastrados' state={0} />
                <DashboardStat title='Visitantes cadastrados' state={0} />
                <DashboardStat title='Visitantes cadastrados' state={0} />
                <DashboardStat title='Visitantes cadastrados' state={0} />
            </div>
        </>
    );
}