import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Box } from '@chakra-ui/react'
import { ImExit } from 'react-icons/im';
import { BiTimeFive } from 'react-icons/bi';
import moment from 'moment';
import { useToast } from '@chakra-ui/react'
import { useDarkMode } from 'usehooks-ts';

interface PopoverCustomProps {
    visitName: string;
    onConfirm: Function;
}

export function PopoverCustom({ visitName, onConfirm }: PopoverCustomProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const { isDarkMode } = useDarkMode()

    return (
        <>
            <Button colorScheme='red' onClick={onOpen} size='sm' rightIcon={<ImExit />}>Registrar saída</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className={`${isDarkMode ? 'dark' : 'light'}`}>
                    <ModalHeader className='dark:bg-gray-800 dark:text-white'>Confirmar saída?</ModalHeader>
                    <ModalCloseButton className="dark:text-white" />
                    <ModalBody className='dark:bg-gray-800 dark:text-white'>
                        <p>Deseja registar a sáida do(a) visitante “<strong>{visitName}</strong>”?</p>
                        <br />
                        <p>Esta operação não poderá ser desfeita.</p>

                        <Box className="flex items-center justify-start opacity-40 select-none mt-4">
                            <BiTimeFive className="mr-1" /> <span className="text-right">Saída: {moment().format('DD/MM/YYYY - HH:mm[h]')}</span>
                        </Box>
                    </ModalBody>

                    <ModalFooter className='dark:bg-gray-800 dark:text-white'>
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
                        <Button onClick={onClose} variant='ghost' className="dark:hover:bg-gray-600 dark:border-gray-600">Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}