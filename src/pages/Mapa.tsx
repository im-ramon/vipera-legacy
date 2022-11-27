import React, { useEffect } from 'react';
import DashboardStat from '../components/_parts/DashboardStat';
import PageHeader from '../components/_parts/PageHeader';

export default function Mapa() {
    useEffect(() => {
        document.title = 'Vipera | Mapa'
    }, [])

    return (
        <>
            <PageHeader title='Mapa' subtitle='Veja onde os visitantes estão localizados.' />
            <div className="mapa_area mt-3 grid-cols-6">
                <div className='grid-cols-6 grid gap-3'>
                    <DashboardStat colorize={true} title='RP' state={4} />
                    <DashboardStat colorize={true} title='SVP' state={0} />
                    <DashboardStat colorize={true} title='EB Fácil' state={0} />
                    <DashboardStat colorize={true} title='PC Cmt' state={0} />
                    <DashboardStat colorize={true} title='PC S Cmt' state={0} />
                    <DashboardStat colorize={true} title='Adj Cmdo' state={0} />
                    <DashboardStat colorize={true} title='1ª Seção' state={1} />
                    <DashboardStat colorize={true} title='Conformidade' state={0} />
                    <DashboardStat colorize={true} title='Protocolo' state={0} />
                    <DashboardStat colorize={true} title='Justiça' state={0} />
                    <DashboardStat colorize={true} title='2ª Seção' state={0} />
                    <DashboardStat colorize={true} title='Enfermaria' state={1} />
                    <DashboardStat colorize={true} title='Museu' state={0} />
                    <DashboardStat colorize={true} title='3ª Seção' state={0} />
                    <DashboardStat colorize={true} title='Auditório' state={1} />
                    <DashboardStat colorize={true} title='SALC' state={0} />
                    <DashboardStat colorize={true} title='Tesouraria' state={0} />
                    <DashboardStat colorize={true} title='4ª Seção' state={0} />
                    <DashboardStat colorize={true} title='Fiscalização Adm' state={0} />
                    <DashboardStat colorize={true} title='FuSEX' state={0} />
                    <DashboardStat colorize={true} title='OCP' state={0} />
                    <DashboardStat colorize={true} title='SFPC' state={2} />
                    <DashboardStat colorize={true} title='PRM' state={0} />
                    <DashboardStat colorize={true} title='Almox' state={0} />
                    <DashboardStat colorize={true} title='Rancho' state={0} />
                    <DashboardStat colorize={true} title='PMT' state={0} />
                    <DashboardStat colorize={true} title='Estação rádio' state={0} />
                    <DashboardStat colorize={true} title='Lojinha' state={1} />
                    <DashboardStat colorize={true} title='1ª Cia Fuz' state={0} />
                    <DashboardStat colorize={true} title='2ª Cia Fuz' state={0} />
                    <DashboardStat colorize={true} title='3ª Cia Fuz' state={1} />
                    <DashboardStat colorize={true} title='CCAp' state={0} />
                </div>
            </div>
        </>
    );
}