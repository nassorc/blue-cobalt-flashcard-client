import { Badge } from "../../../shared/styled/Badge.styled";

export default function BadgeComponent({icon, info}) {
    return(
        <Badge>
            {icon}
            {(info) ? <p>{info}</p> : null }
        </Badge>
    )
}