import React from "react";

import { Badge, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, useDisclosure } from "@chakra-ui/react";
import AsideLinks from "../components/_parts/AsideLinks";
import { BiUserMinus } from "react-icons/bi";

export default function RegistrarChegada() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    return (
        <>
            <AsideLinks to='registar-saida' title="Registrar saída" onClick={onOpen}>
                <BiUserMinus size={20} />
            </AsideLinks>
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
                        Registrar saída
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='nome'>Nome</FormLabel>
                                <Input
                                    required
                                    ref={firstField}
                                    id='nome'
                                    placeholder='Nome completo do visitante'
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='documento'>Tipo de documento</FormLabel>
                                <Select id='documento' defaultValue='segun' required>
                                    <option value='-' disabled>Selecione um tipo</option>
                                    <option value='cpf'>CPF</option>
                                    <option value='idt'>Identidade</option>
                                    <option value='outros'>Outros</option>
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor='identificacao'>Número documento</FormLabel>
                                <Input
                                    required
                                    ref={firstField}
                                    id='identificacao'
                                    placeholder='Número do documento do vistante'
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='obs'>Data/ hora da chegada</FormLabel>
                                <Input
                                    required
                                    id="chegada"
                                    placeholder="Select Date and Time"
                                    size="md"
                                    type="datetime-local"
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='obs'>Observação</FormLabel>
                                <Textarea id='obs' />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='green'>Salvar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}