import { Spinner } from '@chakra-ui/react';

export default function Loading() {
    return (
        <div className="w-full justify-center items-center h-screen bg-white flex">
            <Spinner size='xl' color='green.500' />
        </div>
    )
}