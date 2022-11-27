import React, { useEffect } from 'react';
import PageHeader from '../components/_parts/PageHeader';

export default function Relatorios() {
    useEffect(() => {
        document.title = 'Vipera | Relatórios'
    }, [])

    return (
        <>
            <PageHeader title='Relatórios' subtitle='Verificar se é o caso fazer isso mesmo' />
            <ul>
                <li>Diário</li>
                <li>Mensal</li>
                <li>Todos os visitantes</li>
            </ul>
        </>
    );
}