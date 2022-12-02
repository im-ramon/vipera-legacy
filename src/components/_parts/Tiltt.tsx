import { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

export default function Tilt(props: any) {
    const { options, ...rest } = props;
    const tilt = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tilt.current as any, options);
    }, [options]);

    return <div ref={tilt} {...rest} />;
}

