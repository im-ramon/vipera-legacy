import React, { useEffect, useRef, useState } from 'react';

import { child, get, ref } from 'firebase/database';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import ShortUniqueId from 'short-unique-id';
import { database } from '../services/firebase';

import { Button, Collapse, Editable, EditableInput, EditablePreview, EditableTextarea, Heading, Input, InputGroup, InputLeftAddon, useDisclosure } from '@chakra-ui/react';
import { BiPrinter } from 'react-icons/bi';
import PageHeader from '../components/_parts/PageHeader';

import brasao from '../assets/images/img/brasao.png';

export default function Relatorios() {
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const { isOpen, onOpen } = useDisclosure()
    const uid = new ShortUniqueId({ length: 5 });


    const [initialDate, setInitialDate] = useState<string>(moment().format('YYYY-MM-DD'))
    const [finalDate, setFinalDate] = useState<string>(moment().format('YYYY-MM-DD'))
    const [visitsList, setVisitsList] = useState<any[]>([])
    const [visitsListFiltered, setVisitsListFiltered] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const today = moment().format('YYYY-MM-DD')

    function generatesReport(event: React.FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        event.preventDefault()
        get(child(ref(database), 'visits')).then((snapshot) => {
            if (snapshot.exists()) {
                const data = Object.entries(snapshot.val()).map((value: any) => value[1])
                return data
            } else {
                console.log("No data available - generatesDataForChart");
                return []
            }
        })
            .then(data => {
                const dataFiltered = data.filter(el => {
                    const formatedEntrance = moment(el['entrance']).format('YYYY-MM-DD')
                    return (moment(formatedEntrance).isBetween(initialDate, finalDate, undefined, '[]') && el['entrance'] !== '')
                })
                return dataFiltered
            })
            .then(data => {
                const dataSorted = data.sort((a, b) => {
                    return (moment(a['entrance']).isSameOrAfter(b['entrance']) ? 1 : -1)
                })
                setVisitsList(dataSorted)
                setVisitsListFiltered(dataSorted)
            })
            .then(() => {
                onOpen()
                setIsLoading(false)
            })
    }

    function sortVisitsList(compare: 'name' | 'documentId' | 'entrance' | 'exit' | 'place') {
        if (compare == 'name' || compare == 'place') {
            const dataSortered = [...visitsList]
            setVisitsListFiltered(dataSortered.sort((a, b) => a[compare].localeCompare(b[compare])))
        } else if (compare == 'documentId') {
            const dataSortered = [...visitsList]
            setVisitsListFiltered(dataSortered.sort((a, b) => a[compare] - b[compare]))
        } else if (compare == 'entrance' || compare == 'exit') {
            const dataSortered = [...visitsList]
            setVisitsListFiltered(dataSortered.sort((a, b) => moment(a[compare]).isSameOrAfter(b[compare]) ? 1 : -1))
        }
    }

    useEffect(() => {
        document.title = 'Vipera | Relatórios'
    }, [])

    return (
        <>
            <PageHeader title='Relatórios' subtitle='Visualize e imprima relatórios dos visitantes e visitas realizadas' />
            <div className='flex justify-start mb-4 mt-8'>
                <Heading size='sm'>Escolha o período do relatório:</Heading>
            </div>
            <form onSubmit={(e) => { generatesReport(e) }} className='grid gap-4 grid-cols-12'>
                <InputGroup size='md' className='col-span-5'>
                    <InputLeftAddon children='Data inicial' className='dark:bg-gray-700 dark:border-gray-600 dark:text-white' />
                    <Input
                        required
                        id="report_date"
                        placeholder="Selecione uma data"
                        size="md"
                        type="date"
                        max={finalDate}
                        value={initialDate}
                        onChange={e => { setInitialDate(e.target.value) }}
                        className='dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                </InputGroup>
                <InputGroup size='md' className='col-span-5'>
                    <InputLeftAddon children='Data final' className='dark:bg-gray-700 dark:border-gray-600 dark:text-white' />
                    <Input
                        required
                        id="report_date"
                        placeholder="Selecione uma data"
                        size="md"
                        type="date"
                        max={today}
                        value={finalDate}
                        onChange={e => { setFinalDate(e.target.value) }}
                        className='dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />

                </InputGroup>
                <Button type='submit' colorScheme='green' variant='outline' isLoading={isLoading} className='col-span-2 dark:text-primary-900'>Gerar relatório</Button>
            </form >
            <Collapse in={isOpen} animateOpacity>
                <div ref={componentRef} className='rounded-md mt-4 py-4 px-10 border bg-white'>
                    <div>
                        {/* 
                    documentId: "03616013526",
                    entrance: "2022-11-28T17:38:41-03:00",
                    exit: "2022-11-28T17:38:48-03:00",
                    name: "Ramon Oliveira dos Santos",
                    place: "SVP"
                    */}
                        <div className="overflow-x-auto relative">
                            <div className='text-sm font-bold text-center text-text flex flex-col justify-center items-center font-sans'>
                                <img src={brasao} className='w-36' />
                                <p>MINISTÉRIO DA DEFESA</p>
                                <p>EXÉRCITO BRASILEIRO</p>
                                <p>35º BATALHÃO DE INFANTARIA</p>
                                <p>(BATALHÃO LUIZ BARBALHO BEZERRA)</p>
                            </div>
                            <h1 className='uppercase my-8 font-bold text-text  text-center w-full'>
                                <span>Relatório de visitantes</span>
                                {initialDate === finalDate ? (
                                    <span> no dia {moment(initialDate).format("DD/MM/YYYY")}</span>
                                ) : (
                                    <span> entre os dias <u>{moment(initialDate).format("DD/MM/YYYY")}</u> e <u>{moment(finalDate).format("DD/MM/YYYY")}</u></span>
                                )}
                                <span>.</span>
                            </h1>

                            <table className="w-full text-sm text-left text-gray-500 border">
                                <thead className="text-xs text-gray-700 uppercase ">
                                    <tr>
                                        <th scope="col" className="py-3 px-4 bg-gray-50 ">
                                            <div className='flex items-center'>
                                                <span>Nome completo</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { sortVisitsList('name') }} className="cursor-pointer ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            <div className='flex items-center'>
                                                <span>CPF</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { sortVisitsList('documentId') }} className="cursor-pointer ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3 px-4 bg-gray-50 ">
                                            <div className='flex items-center'>
                                                <span>Entrada</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { sortVisitsList('entrance') }} className="cursor-pointer ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            <div className='flex items-center'>
                                                <span>Saída</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { sortVisitsList('exit') }} className="cursor-pointer ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3 px-4 bg-gray-50">
                                            <div className='flex items-center'>
                                                <span>Destino</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { sortVisitsList('place') }} className="cursor-pointer ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3 px-4 bg-gray-50">
                                            <div className='flex items-center'>
                                                <span>Cargo/ Função</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-xs'>
                                    {visitsListFiltered.map((el, index) => {
                                        return (
                                            <tr key={uid()} className={`border-y-2 dark:text-white${index % 2 == 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                                <th scope="row" className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {el.name}
                                                </th>
                                                <td className="px-4">
                                                    {el.documentId.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                                                </td>
                                                <td className="px-4">
                                                    {moment(el.entrance).format('DD/MM/YYYY [às] HH:mm[h]')}
                                                </td>
                                                <td className="px-4">
                                                    {moment(el.exit).format('DD/MM/YYYY [às] HH:mm[h]')}
                                                </td>
                                                <td className="px-6">
                                                    {el.place}
                                                </td>
                                                <td className="px-6">
                                                    {el.occupation}
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td scope="col" colSpan={5} className="py-3 px-4 bg-gray-50 text-right">
                                            <h3 className='w-full text-right pr-2 text-gray-400'>
                                                <span>Relatório de visitantes</span>
                                                {initialDate === finalDate ? (
                                                    <span> no dia {moment(initialDate).format("DD/MM/YYYY")}</span>
                                                ) : (
                                                    <span> entre os dias {moment(initialDate).format("DD/MM/YYYY")} e {moment(finalDate).format("DD/MM/YYYY")}</span>
                                                )}
                                                <p className='text-xs'>Impresso em: {moment().format('DD/MM/YYYY [às] HH:mm[h]')}</p>
                                            </h3>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <p className="py-1 px-4 text-gray-600 text-right">Total de visitas: <strong>{visitsListFiltered.length}</strong></p>
                        </div>
                        <Editable defaultValue={`Feira de Santana, BA, ${moment().format('DD/MM/YYYY')}`} className='mt-8 text-text w-full text-center'>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>

                        <Editable defaultValue='DIGITE O NOME PARA ASSINATURA (SE FOR NECESSÁRIO)' className='mt-8 text-text w-full text-center font-bold'>
                            <EditablePreview />
                            <EditableTextarea />
                        </Editable>
                    </div>
                </div>
                <Button colorScheme='green' className='self-end justify-self-end ml-auto mt-8' leftIcon={<BiPrinter />} onClick={handlePrint}>Imprimir</Button>
            </Collapse>
        </>
    );
}