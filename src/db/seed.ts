import { ref, update } from "firebase/database";
import { database } from "../../src/services/firebase";

function runSeed() {
    update(ref(database, 'places'), {
        'RP': 'Relações Públicas',
        'SVP': 'SVP',
        'EB_Fácil': 'EB Fácil',
        'PC_Cmt': 'PC Cmt Btl',
        'PC_S_Cmt': 'PC S Cmt Btl',
        'Adj_Cmdo': 'Adj Cmdo',
        '1ª_Seção': '1ª Seção',
        '2ª_Seção': '2ª Seção',
        '3ª_Seção': '3ª Seção',
        '4ª_Seção': '4ª Seção',
        'Tesouraria': 'Tesouraria',
        'Conformidade': 'Conformidade',
        'Protocolo': 'Protocolo',
        'Justiça': 'Justiça',
        'Enfermaria': 'Enfermaria',
        'Museu': 'Museu',
        'Auditório': 'Auditório',
        'SALC': 'SALC',
        'Fiscalização_Adm': 'Fiscalização',
        'FuSEX': 'FuSEX',
        'OCP': 'OCP',
        'SFPC': 'SFPC',
        'PRM': 'PRM',
        'Almox': 'Almox',
        'Rancho': 'Rancho',
        'PMT': 'PMT',
        'Estacao_rádio': 'Estação rádio',
        'Lojinha': 'Lojinha',
        '1ª_Cia_Fuz': '1ª Cia Fuz',
        '2ª_Cia_Fuz': '2ª Cia Fuz',
        '3ª_Cia_Fuz': '3ª Cia Fuz',
        'CCAp': 'CCAp'
    })
}

runSeed()


