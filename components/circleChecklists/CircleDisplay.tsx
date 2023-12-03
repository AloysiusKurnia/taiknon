import { $Enums } from "@prisma/client";

export interface CirlceDispalyProps {
  status: $Enums.CompletionCriteria | null;
  color?: string;
}

export default function CircleDisplay(props: CirlceDispalyProps) {
  const { color = 'yellow' } = props;
  let filling: JSX.Element | null = null;
  const r = 11.5;
  switch (props.status) {
    case $Enums.CompletionCriteria.Partial:
      filling = <path
        d={`M -${r} 0 A ${r} ${r} 0 0 0 ${r} 0`}
        fill={color}
        transform="rotate(-45 0 0)"
      />;
      break;
    case $Enums.CompletionCriteria.Total:
      filling = <circle
        cx="0" cy="0" r={r}
        fill={color}
        stroke="none"
      />;
  }

  return <svg width="32" height="32" viewBox="-16 -16 32 32">
    {filling}
    <circle
      cx="0" cy="0" r="13.5"
      stroke={props.status ? color : 'gray'}
      fill="none" strokeWidth="2.5"
    />
  </svg>;
}