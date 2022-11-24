import React, { useEffect } from 'react';
import PageHeader from '../components/_parts/PageHeader';

export default function Instrucoes() {
    useEffect(() => {
        document.title = 'Vipera | Instruções'
    }, [])

    return (
        <PageHeader title='Instruções' subtitle='Recomendações e ordens gerais para opeção do sistema.' />
    );
}