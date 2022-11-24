import React, { useState } from "react";
import { database } from "../services/firebase";

import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, Stack, Textarea, useDisclosure } from "@chakra-ui/react";
import { BiUserPlus } from "react-icons/bi";
import AsideLinksEmpty from "../components/_parts/AsideLinksEmpty";
import CPF from 'cpf-check';
import { ref, set } from "firebase/database";

export default function RegistrarChegada() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const [documento, setDocumento] = useState<string>('');
    const [nome, setNome] = useState<string>('');

    function registrarChegada(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()
        set(ref(database, 'visitantes/' + 'visitante'), {
            documento,
            nome
        });
    }

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
                                    ref={firstField}
                                    id='nome'
                                    isInvalid={!CPF.validate(documento)}
                                    errorBorderColor='red.300'
                                    value={documento}
                                    maxLength={11}
                                    onChange={(event) => { setDocumento(event.target.value.replace(/[^0-9]/, '')) }}
                                    placeholder='00000000000'
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='nome'>Nome</FormLabel>
                                <Input
                                    disabled={documento.length == 0}
                                    required
                                    id='nome'
                                    placeholder='Nome completo do visitante'
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='obs'>Data/ hora da chegada</FormLabel>
                                <Input
                                    required
                                    disabled={documento.length == 0}
                                    id="chegada"
                                    placeholder="Select Date and Time"
                                    size="md"
                                    type="datetime-local"
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='obs'>Observação</FormLabel>
                                <Textarea
                                    id='obs'
                                    disabled={documento.length == 0}
                                />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button onClick={e => { registrarChegada(e) }} colorScheme='green'>Salvar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}