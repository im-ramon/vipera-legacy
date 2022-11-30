import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react'
import { useDarkMode } from 'usehooks-ts';

interface PopoverCustomProps {
    visitName: string;
    onConfirm: Function;
    disabled: boolean;
}

export function PopoverExclueVisit({ visitName, onConfirm, disabled }: PopoverCustomProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isDarkMode } = useDarkMode()

    return (
        <>
            <Button onClick={onOpen} isDisabled={disabled} colorScheme='red'>Excluir</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className={`${isDarkMode ? 'dark' : 'light'}`}>
                    <ModalHeader className='dark:bg-gray-800 dark:text-white'>Confirmar exclusão?</ModalHeader>
                    <ModalCloseButton className="dark:text-white" />
                    <ModalBody className='dark:bg-gray-800 dark:text-white'>
                        <p>Deseja excluir os dados do(a) visitante “<strong>{visitName}</strong>”?</p>
                        <br />
                        <p>Esta operação não poderá ser desfeita.</p>
                    </ModalBody>

                    <ModalFooter className='dark:bg-gray-800 dark:text-white'>
                        <Button isDisabled={disabled} colorScheme='red' mr={3} onClick={() => {
                            onConfirm()
                            onClose()
                        }
                        }>
                            Excluir
                        </Button>
                        <Button onClick={onClose} variant='ghost' className="dark:hover:bg-gray-600 dark:border-gray-600">Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}