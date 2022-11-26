interface PulsePointProps {
    size: number;
}
export default function PulsePoint({ size }: PulsePointProps) {
    return (
        <svg className="pulse" x="0px" y="0px" width={size + "px"} height={size + "px"} viewBox="0 0 100 100" >
            <circle cx="50" cy="50" r="6" />
            <circle className="pulse-circle" cx="50" cy="50" r="4" strokeWidth="2" />
            <circle className="pulse-circle-2" cx="50" cy="50" r="4" strokeWidth="2" />
        </svg>
    );
}