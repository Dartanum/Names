import React from 'react'
import { Badge } from '@sberdevices/plasma-ui'

export default function StatContainer(props) {
    return(
            <div>
                <Badge
                    text={`Сказано имён: ${props.сount}`}
                    size='l'
                    style={{width: '150px', margin: '30px auto'}}
                />
            </div>
    )
}