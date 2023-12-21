import { Badge } from "../../../../../lib/styled/Badge.styled";

export default function BadgeComponent({ icon, info }) {
  return (
    <Badge>
      {icon}
      {info ? <p>{info}</p> : 0}
    </Badge>
  );
}
