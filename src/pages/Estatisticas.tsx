import React, { useEffect } from 'react';
import PageHeader from '../components/_parts/PageHeader';

export default function Estatisticas() {
    useEffect(() => {
        document.title = 'Vipera | Estatísticas'
    }, [])

    return (
        <PageHeader title='Estatísticas' subtitle='Verificar se é o caso fazer isso mesmo' />
    );
}