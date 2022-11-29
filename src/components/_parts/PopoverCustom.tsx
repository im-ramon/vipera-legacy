import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Box } from '@chakra-ui/react'
import { ImExit } from 'react-icons/im';
import { BiTimeFive } from 'react-icons/bi';
import moment from 'moment';
import { useToast } from '@chakra-ui/react'

interface PopoverCustomProps {
    visitName: string;
    onConfirm: Function;
}

export function PopoverCustom({ visitName, onConfirm }: PopoverCustomProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    return (
        <>
            <Button colorScheme='red' onClick={onOpen} size='sm' rightIcon={<ImExit />}>Registrar saída</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmar saída?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Deseja registar a sáida do(a) visitante “<strong>{visitName}</strong>”?</p>
                        <br />
                        <p>Esta operação não poderá ser desfeita.</p>

                        <Box className="flex items-center justify-start opacity-40 select-none mt-4">
                            <BiTimeFive className="mr-1" /> <span className="text-right">Saída: {moment().format('DD/MM/YYYY - HH:mm[h]')}</span>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => {
                            onConfirm()
                            onClose()
                            toast({
                                title: 'Saída registrada com sucesso!',
                                status: 'success',
                                duration: 5000,
                                isClosable: true,
                            })
                        }
                        }>
                            Confirmar
                        </Button>
                        <Button onClick={onClose} variant='ghost'>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}