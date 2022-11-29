import { useEffect } from 'react';
import PageHeader from '../components/_parts/PageHeader';

export default function Instrucoes() {
    useEffect(() => {
        document.title = 'Vipera | Instruções'
    }, [])

    return (
        <>
            <PageHeader title='Instruções' subtitle='Recomendações e ordens gerais para operação do sistema.' />
            <p>Incluir instruções para o operador, bem como ordens específicas.</p>
        </>
    );
}