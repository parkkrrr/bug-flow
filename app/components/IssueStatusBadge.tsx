import { Badge } from '@radix-ui/themes'
import React from 'react'
import { Status } from '../generated/prisma'

type BadgeColor=React.ComponentProps<typeof Badge>['color']

const statusMap:Record<Status,{label:string,color:BadgeColor}>={
    OPEN:{label:"Open", color:'red'},
    IN_PROGRESS:{label:"In Progress", color:"violet"},
    CLOSED:{label:"Closed", color:"green"},
}
const IssueStatusBadge = ({status}:{status:Status}) => {
  return (
    <div>	<Badge color={statusMap[status].color}>{statusMap[status].label}</Badge></div>
  )
}

export default IssueStatusBadge