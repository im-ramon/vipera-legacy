import React, { useEffect, useState, PureComponent } from 'react';
import PageHeader from '../components/_parts/PageHeader';
import DashboardStat from '../components/_parts/DashboardStat';
import { child, get, onValue, ref } from 'firebase/database';
import { database } from '../services/firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

export default function Dashboard() {

    const [visitorsAcitive, setVisitorsAcitive] = useState<number>(0)
    const [totalVisitors, setTotalVisitors] = useState<number>(0)
    const [visitsPerYear, setVisitsPerYear] = useState<number>(0)
    const [visitsPerMonth, setVisitsPerMonth] = useState<number>(0)
    const [visitsPerWeek, setVisitsPerWeek] = useState<number>(0)
    const [visitsPerDay, setVisitsPerDay] = useState<number>(0)
    const [chartData, setChartData] = useState<any[]>([])

    function getVisitorsAcitive() {
        onValue(ref(database, 'visitors'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setVisitorsAcitive(Object.entries(data).filter((value: any) => {
                    return value[1]['isHere']
                }).length)
            }
        })
    }

    function getTotalVisitors() {
        onValue(ref(database, 'visitors'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setTotalVisitors(Object.entries(data).length)
            }
        })
    }

    function getVisitsPerPeriod() {
        onValue(ref(database, 'visits'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setVisitsPerYear(Object.entries(data).reduce((prev, curr: any) => {
                    return prev + (moment().isSame(curr[1].entrance, 'year') ? 1 : 0)
                }, 0))

                setVisitsPerMonth(Object.entries(data).reduce((prev, curr: any) => {
                    return prev + (moment().isSame(curr[1].entrance, 'month') ? 1 : 0)
                }, 0))

                setVisitsPerWeek(Object.entries(data).reduce((prev, curr: any) => {
                    return prev + (moment().isSame(curr[1].entrance, 'week') ? 1 : 0)
                }, 0))

                setVisitsPerDay(Object.entries(data).reduce((prev, curr: any) => {
                    return prev + (moment().isSame(curr[1].entrance, 'day') ? 1 : 0)
                }, 0))
            }
        })
    }

    function generatesDataForChart() {
        console.clear();
        get(child(ref(database), 'visits')).then((snapshot) => {
            if (snapshot.exists()) {
                const data = Object.entries(snapshot.val()).map((value: any) => value[1]['entrance'])
                return data
            } else {
                console.log("No data available - generatesDataForChart");
                return []
            }
        })
            .then(list => {
                return [
                    {
                        name: 'JAN',
                        total: list.filter((el) => (moment(el).month() + 1) == 1).length,
                    },
                    {
                        name: 'FEV',
                        total: list.filter((el) => (moment(el).month() + 1) == 2).length,
                    },
                    {
                        name: 'MAR',
                        total: list.filter((el) => (moment(el).month() + 1) == 3).length,
                    },
                    {
                        name: 'ABR',
                        total: list.filter((el) => (moment(el).month() + 1) == 4).length,
                    },
                    {
                        name: 'MAIO',
                        total: list.filter((el) => (moment(el).month() + 1) == 5).length,
                    },
                    {
                        name: 'JUN',
                        total: list.filter((el) => (moment(el).month() + 1) == 6).length,
                    },
                    {
                        name: 'JUL',
                        total: list.filter((el) => (moment(el).month() + 1) == 7).length,
                    },
                    {
                        name: 'AGO',
                        total: list.filter((el) => (moment(el).month() + 1) == 8).length,
                    },
                    {
                        name: 'SET',
                        total: list.filter((el) => (moment(el).month() + 1) == 9).length,
                    },
                    {
                        name: 'OUT',
                        total: list.filter((el) => (moment(el).month() + 1) == 10).length,
                    },
                    {
                        name: 'NOV',
                        total: list.filter((el) => (moment(el).month() + 1) == 11).length,
                    },
                    {
                        name: 'DEZ',
                        total: list.filter((el) => (moment(el).month() + 1) == 12).length,
                    },
                ]

            })
            .then(setChartData)
            .catch((error) => {

                console.error(error);
            });

        /* Implementação do filtro por local e mês 
        get(child(ref(database), 'places')).then((snapshot) => {
            if (snapshot.exists()) {
                const data = Object.keys(snapshot.val()).map(value => {
                    return {
                        place: value,
                        1
                    }
                })
                return data
            } else {
                console.log("No data available in key 'places'");
            }
        })
            .then(list => {

            })
            .catch((error) => { console.error(error); });

        console.log(moment().month());
        */
    }

    useEffect(() => {
        getVisitorsAcitive()
        getTotalVisitors()
        getVisitsPerPeriod()
        generatesDataForChart()
        document.title = 'Vipera | Dashboard'
    }, [])

    return (
        <>
            <PageHeader title='Dashboard' subtitle='Um resumo dos dados estatísticos dos visitantes.' />
            <div className='grid-cols-5 grid gap-3'>
                <DashboardStat title='Visitantes agora' state={visitorsAcitive} />
                <DashboardStat title='Visitantes cadastrados' state={totalVisitors} />
                <DashboardStat title='Visitas este mês' state={visitsPerMonth} />
                <DashboardStat title='Visitas esta semana' state={visitsPerWeek} />
                <DashboardStat title='Visitas hoje' state={visitsPerDay} />
            </div>
            <div className='mt-3 border rounded-md py-4 px-2 h-3/5 '>
                <h1 className='text-right text-xl pb-2 pr-8 font-semibold'>Visitas por mês</h1>
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                        <Line type="monotone" dataKey="total" name='Total de visitas' activeDot={{ r: 8 }} stroke="#42cf78" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}