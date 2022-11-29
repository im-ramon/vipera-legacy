import { useEffect, useState } from 'react';

import { child, get, onValue, ref } from 'firebase/database';
import { database } from '../services/firebase';

import DashboardStat from '../components/_parts/DashboardStat';
import PageHeader from '../components/_parts/PageHeader';

export default function Mapa() {

    const [places, setPlaces] = useState<any[]>([])
    const [listPlaces, setListPlaces] = useState<any[]>([])

    function getPlaces() {
        get(child(ref(database), 'places')).then((snapshot) => {
            if (snapshot.exists()) {
                const data = Object.entries(snapshot.val()).map(value => {
                    return {
                        place: value
                    }
                })
                setPlaces(data)
            } else {
                console.log("No data available in key 'places'");
            }
        })
            .catch((error) => { console.error(error); });
    }

    async function getVisitorsAcitive() {
        onValue(ref(database, 'visits'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const data = Object.entries(snapshot.val())
                    .map((value: any) => {
                        return value[1]
                    })
                    .filter(value => {
                        return value.exit === ''
                    })

                setListPlaces(data)
            }
        })
    }


    function filterArrayPlace(place: string) {
        return listPlaces.reduce((prev, curr: any) => {
            return prev + (curr.place === place ? 1 : 0)
        }, 0)
    }


    useEffect(() => {
        getVisitorsAcitive()
        getPlaces()
        document.title = 'Vipera | Mapa'
    }, [])

    return (
        <>
            <PageHeader title='Mapa' subtitle='Monitore a quantidade de visitantes por localidade.' />
            <div className="mapa_area mt-3 grid-cols-6">
                <div className='grid-cols-6 grid gap-3'>
                    {places.map(el => <DashboardStat key={el['place'][0]} colorize={true} title={el['place'][1]} state={filterArrayPlace(el['place'][1])} />)}
                </div>
            </div>
        </>
    );
}