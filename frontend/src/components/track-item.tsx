import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

export const TrackItem = ({name, artist}: {name:string, artist:string}) => {
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{artist}</CardDescription>
            </CardHeader>
        </Card>
    </div>
  )
}
