type LabelInputPairProps = {
  label: string;
  onChange: (value: string) => void;
  type?: string;
};

export default function LabelInputPair({
  label,
  onChange,
  type = 'text'
}: LabelInputPairProps) {
  return <label>
    {label}
    <input type={type} onChange={e => onChange(e.target.value)} />
  </label>;
}