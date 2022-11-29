import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react'

interface PopoverCustomProps {
    visitName: string;
    onConfirm: Function;
    disabled: boolean;
}

export function PopoverExclueVisit({ visitName, onConfirm, disabled }: PopoverCustomProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <>
            <Button onClick={onOpen} isDisabled={disabled} colorScheme='red'>Excluir</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmar saída?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Deseja excluir os dados de “<strong>{visitName}</strong>”?</p>
                        <br />
                        <p>Esta operação não poderá ser desfeita.</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button isDisabled={disabled} colorScheme='red' mr={3} onClick={() => {
                            onConfirm()
                            onClose()
                        }
                        }>
                            Excluir
                        </Button>
                        <Button onClick={onClose} variant='ghost'>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}