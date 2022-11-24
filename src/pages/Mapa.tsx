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
            <div className="mapa_area mt-3">
                <h3 className='text-left text-xl pl-2 font-semibold'>Entrada do batalhão</h3>
                <div className='grid-cols-6 grid gap-3'>
                    <DashboardStat title='RP' state={4} />
                    <DashboardStat title='SVP' state={0} />
                    <DashboardStat title='EB Fácil' state={0} />
                </div>
            </div>

            <div className="mapa_area mt-3">
                <h3 className='text-left text-xl pl-2 font-semibold'>Comando</h3>
                <div className='grid-cols-6 grid gap-3'>
                    <DashboardStat title='PC Cmt' state={0} />
                    <DashboardStat title='PC S Cmt' state={0} />
                    <DashboardStat title='Adj Cmdo' state={0} />
                </div>
            </div>

            <div className="mapa_area mt-3">
                <h3 className='text-left text-xl pl-2 font-semibold'>Pavilhão de Comando</h3>
                <div className='grid-cols-6 grid gap-3'>
                    <DashboardStat title='1ª Seção' state={1} />
                    <DashboardStat title='Conformidade' state={0} />
                    <DashboardStat title='Protocolo' state={0} />
                    <DashboardStat title='Justiça' state={0} />
                    <DashboardStat title='2ª Seção' state={0} />
                    <DashboardStat title='Enfermaria' state={1} />
                    <DashboardStat title='Museu' state={0} />
                </div>
            </div>

            <div className="mapa_area mt-3">
                <h3 className='text-left text-xl pl-2 font-semibold'>Pavilhão de Adminstrativo</h3>
                <div className='grid-cols-6 grid gap-3'>
                    <DashboardStat title='3ª Seção' state={0} />
                    <DashboardStat title='Auditório' state={1} />
                    <DashboardStat title='SALC' state={0} />
                    <DashboardStat title='Tesouraria' state={0} />
                    <DashboardStat title='4ª Seção' state={0} />
                    <DashboardStat title='Fiscalização Adm' state={0} />
                    <DashboardStat title='FuSEX' state={0} />
                    <DashboardStat title='OCP' state={0} />
                    <DashboardStat title='SFPC' state={2} />
                    <DashboardStat title='PRM' state={0} />
                    <DashboardStat title='Almox' state={0} />
                    <DashboardStat title='Rancho' state={0} />
                </div>
            </div>

            <div className="mapa_area mt-3">
                <h3 className='text-left text-xl pl-2 font-semibold'>Outros</h3>
                <div className='grid-cols-6 grid gap-3'>
                    <DashboardStat title='PMT' state={0} />
                    <DashboardStat title='Estação rádio' state={0} />
                    <DashboardStat title='Lojinha' state={1} />
                </div>
            </div>

            <div className="mapa_area mt-3">
                <h3 className='text-left text-xl pl-2 font-semibold'>Companhias</h3>
                <div className='grid-cols-6 grid gap-3'>
                    <DashboardStat title='1ª Cia Fuz' state={0} />
                    <DashboardStat title='2ª Cia Fuz' state={0} />
                    <DashboardStat title='3ª Cia Fuz' state={1} />
                    <DashboardStat title='CCAp' state={0} />
                </div>
            </div>
        </>
    );
}