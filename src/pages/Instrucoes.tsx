import { useEffect } from 'react';
import PageHeader from '../components/_parts/PageHeader';

export default function Instrucoes() {
    useEffect(() => {
        document.title = 'Vipera | Instruções'
    }, [])

    return (
        <>
            <PageHeader title='Instruções' subtitle='Recomendações e ordens gerais para operação do sistema.' />

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <h1 className='w-full text-left pl-4 py-4 text-xl font-semibold'>Horário de atendimento</h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Dia da semana
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Horário (manhã)
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Horário (tarde)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Segunda-feira
                            </th>
                            <td className="py-4 px-6">
                                08:00 às 12:00
                            </td>
                            <td className="py-4 px-6">
                                13:30 às 16:30
                            </td>
                        </tr>
                        <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Terça-feira
                            </th>
                            <td className="py-4 px-6">
                                08:00 às 12:00
                            </td>
                            <td className="py-4 px-6">
                                13:30 às 16:30
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Quarta-feira
                            </th>
                            <td className="py-4 px-6">
                                08:00 às 12:00
                            </td>
                            <td className="py-4 px-6">
                                13:30 às 16:30
                            </td>
                        </tr>
                        <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Quinta-feira
                            </th>
                            <td className="py-4 px-6">
                                08:00 às 12:00
                            </td>
                            <td className="py-4 px-6">
                                13:30 às 16:30
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Sexta-feira
                            </th>
                            <td className="py-4 px-6">
                                08:00 às 12:00
                            </td>
                            <td className="py-4 px-6 text-danger">
                                Sem expediente
                            </td>
                        </tr>
                        <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Sábado
                            </th>
                            <td className="py-4 px-6 text-danger">
                                Sem expediente
                            </td>
                            <td className="py-4 px-6 text-danger">
                                Sem expediente
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Domingo
                            </th>
                            <td className="py-4 px-6 text-danger">
                                Sem expediente
                            </td>
                            <td className="py-4 px-6 text-danger">
                                Sem expediente
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </>
    );
}