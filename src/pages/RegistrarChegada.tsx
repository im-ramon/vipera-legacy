import React, { useState, useEffect } from "react";
import { database } from "../services/firebase";
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, Stack, Select, Textarea, useDisclosure } from "@chakra-ui/react";
import { BiTimeFive, BiUserPlus } from "react-icons/bi";
import AsideLinksEmpty from "../components/_parts/AsideLinksEmpty";
import CPF from 'cpf-check';
import { onValue, ref, set } from "firebase/database";
import { useToast } from '@chakra-ui/react'
import ShortUniqueId from "short-unique-id";
import moment from "moment";

export default function RegistrarChegada() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const [documentId, setDocumentId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [place, setPlace] = useState<string>('');
    const [places, setPlaces] = useState<any[]>([]);
    const [note, setNote] = useState<string>('');
    const [visitorIsHere, setVisitorIsHere] = useState<boolean>(false);

    const [showAlertCPF, setShowAlertCPF] = useState<boolean>(false);

    const uid = new ShortUniqueId({ length: 10 });
    const toast = useToast()

    function registerVisitorArrival(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()
        if (checkFormBeforeSend()) {
            set(ref(database, 'visitors/' + documentId), {
                name,
                note,
                isHere: true
            })

            // Registrando chegada
            set(ref(database, 'visits/' + uid()), {
                documentId,
                name,
                place,
                entrance: moment().format(),
                exit: '',
            }).then(() => {
                toast({
                    title: 'Visita cadastrada',
                    description: 'Os dados da visita foram salvos!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                clearForm()
                onClose()
            }).catch(e => {
                console.log(e)
            })
        }
    }

    function getPlaces() {
        onValue(ref(database, 'places'), (snapshot) => {
            const data = snapshot.val();
            setPlaces(Object.entries(data))
        })
    }

    function clearForm() {
        setName('')
        setNote('')
        setDocumentId('')
        setPlace('')
        setVisitorIsHere(false)
    }

    function findVisitor() {
        if (isValidCPF()) {
            onValue(ref(database, 'visitors/' + documentId), (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setName(data['name'])
                    setNote(data['note'])
                    setVisitorIsHere(data['isHere'])
                }
            })
        }
    }

    function checkFormBeforeSend(): boolean {
        if (name == '' || place == '' || !isValidCPF()) {
            toast({
                title: 'Erro no preenchimento do formulário',
                description: 'Preencha todos os dados corretamente para continuar.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            return false
        } else if (visitorIsHere) {
            toast({
                title: 'Registro duplicado',
                description: `O usuário com CPF nº ${documentId} já possui uma seção de visita aberta. Encerre a seção aberta para conseguir abrir uma nova.`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return false
        } else {
            return true
        }

    }

    function isValidCPF(): boolean {
        return (CPF.validate(documentId) && documentId.length === 11) ? true : false;
    }

    useEffect(() => {
        getPlaces()
        if (isValidCPF()) {
            findVisitor()
            setShowAlertCPF(false)
        } else {
            documentId.length > 0 && setShowAlertCPF(true)
            setName('')
            setNote('')
        }
    }, [documentId])

    return (
        <>
            <AsideLinksEmpty title="Registrar chegada" onClick={onOpen}>
                <BiUserPlus size={20} />
            </AsideLinksEmpty>
            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Registrar chegada
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='nome'>CPF</FormLabel>
                                <Input
                                    required
                                    onBlur={() => { setShowAlertCPF(!isValidCPF()) }}
                                    ref={firstField}
                                    id='nome'
                                    isInvalid={showAlertCPF}
                                    errorBorderColor='red.300'
                                    value={documentId}
                                    maxLength={11}
                                    onChange={(event) => { setDocumentId(event.target.value.replace(/[^0-9]/, '')) }}
                                    placeholder='00000000000'
                                />
                            </Box>

                            <span className={`!mt-1 pr-1 text-xs text-right ${showAlertCPF ? 'text-danger' : 'text-white'}`}>CPF inválido</span>

                            <Box>
                                <FormLabel htmlFor='nome'>Nome</FormLabel>
                                <Input
                                    disabled={!CPF.validate(documentId)}
                                    required
                                    id='nome'
                                    value={name}
                                    onChange={(event) => { setName(event.target.value) }}
                                    placeholder='Nome completo do visitante'
                                />
                            </Box>

                            {/* <Box>
                                <FormLabel htmlFor='obs'>Data/ hora da chegada</FormLabel>
                                <Input
                                required
                                disabled={!CPF.validate(documentId)}
                                id="chegada"
                                placeholder="Selecione uma data e horário"
                                size="md"
                                value={dateTime}
                                onChange={(event) => { setDateTime(event.target.value) }}
                                type="datetime-local"
                                />
                            </Box> */}

                            <Box>
                                <FormLabel htmlFor='local'>Local</FormLabel>
                                <Select
                                    disabled={!CPF.validate(documentId)}
                                    placeholder='- Escolha uma local -'
                                    value={place}
                                    required
                                    id="local"
                                    onChange={(event) => { setPlace(event.target.value) }}

                                >
                                    {places.map((el) => <option key={el[0]} value={el[0]}>{el[0]}: {el[1]}</option>)}
                                </Select>
                            </Box>



                            <Box>
                                <FormLabel htmlFor='obs'>Observação</FormLabel>
                                <Textarea
                                    value={note}
                                    onChange={(event) => { setNote(event.target.value) }}
                                    id='obs'
                                    disabled={!CPF.validate(documentId)}
                                />
                            </Box>

                            <Box className="flex items-center justify-center opacity-40 select-none">
                                <BiTimeFive className="mr-1" />
                                <span className="text-right">{moment().format('DD/MM/YYYY - HH:mm[h]')}</span>
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button onClick={e => { registerVisitorArrival(e) }} colorScheme='green'>Salvar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}