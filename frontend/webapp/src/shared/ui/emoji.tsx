const Emoji = ({ label, symbol }: { label: string, symbol: any }) => (
    <span
        className="text-md opacity-50 m-auto"
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}>
        {symbol}
    </span>
);
export { Emoji };