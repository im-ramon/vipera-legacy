import React, { useState, useEffect } from "react";

import { database } from "../services/firebase";
import CPF from 'cpf-check';
import { onValue, ref, remove } from "firebase/database";
import { useToast } from '@chakra-ui/react'

import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, Stack, useDisclosure } from "@chakra-ui/react";
import { BiUserX } from "react-icons/bi";
import AsideLinksEmpty from "../components/_parts/AsideLinksEmpty";
import { PopoverExclueVisit } from "../components/_parts/PopoverExclueVisit";
import { useDarkMode } from 'usehooks-ts'

export default function ExcluirDados() {
    const { isDarkMode } = useDarkMode()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const [documentId, setDocumentId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [visitorIsHere, setVisitorIsHere] = useState<boolean>(false);

    const [showAlertCPF, setShowAlertCPF] = useState<boolean>(false);

    const toast = useToast()

    function clearForm() {
        setName('')
        setDocumentId('')
        setVisitorIsHere(false)
    }

    function findVisitor() {
        if (isValidCPF()) {
            onValue(ref(database, 'visitors/' + documentId), (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setName(data['name'])
                    setVisitorIsHere(data['isHere'])
                }
            })
        }
    }

    function handleDeleteVisitor() {
        if (visitorIsHere) {
            toast({
                title: 'O visitante que você quer excluir possui uma visita aberta.',
                description: 'Registre a saída do visitante antes de apagar seus dados.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })

            return
        }

        if (isValidCPF()) {
            remove(ref(database, 'visitors/' + documentId)).then(console.log)
            clearForm()

            toast({
                title: 'Os dados do visitante foram excluídos!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        } else {
            console.log('travado!')
        }

    }

    function isValidCPF(): boolean {
        return (CPF.validate(documentId) && documentId.length === 11) ? true : false;
    }

    useEffect(() => {
        if (isValidCPF()) {
            findVisitor()
            setShowAlertCPF(false)
        } else {
            documentId.length > 0 && setShowAlertCPF(true)
            setName('')
        }
    }, [documentId])

    return (
        <>
            <AsideLinksEmpty title="Apagar dados" onClick={onOpen}>
                <BiUserX size={20} />
            </AsideLinksEmpty>
            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent
                    className={`${isDarkMode ? 'dark' : 'light'}`}
                >
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px' className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                        Apagar dados de visitante
                    </DrawerHeader>

                    <DrawerBody className="dark:bg-gray-800">
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='nome' className="dark:text-white">CPF</FormLabel>
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
                                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"

                                />
                            </Box>

                            <span className={`!mt-1 pr-1 text-xs text-right ${showAlertCPF ? 'text-danger' : 'text-white dark:text-gray-800'}`}>CPF inválido</span>

                            {name ? (
                                <Box className="dark:text-white">
                                    <h1 className="mb-1">Visitante encontrado:</h1>
                                    <span>Nome: </span>
                                    <strong>{name}</strong>
                                </Box>
                            ) : (
                                <h1 className="text-center !mb-8 dark:text-white">Nenhum visitante cadastrado corresponde ao CPF informado.</h1>
                            )}

                            <Box className="border border-red-300 dark:text-white rounded-md py-2 px-4">
                                <h1 className="font-semibold mb-2">Atenção!</h1>
                                <p>
                                    Ao excluir um usário, não será possível recuperar seus dados posteriormente, entretanto, é possível realizar seu cadastro novamente.
                                    <br />
                                    Os registro de visitas continuarão salvos.
                                </p>
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px' className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                        <Button variant='outline' mr={3} onClick={onClose} className="dark:hover:bg-gray-600 dark:border-gray-600">
                            Cancelar
                        </Button>
                        <PopoverExclueVisit
                            disabled={name == '' || !isValidCPF()}
                            onConfirm={handleDeleteVisitor}
                            visitName={name}
                        />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}