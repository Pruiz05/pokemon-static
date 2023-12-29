import { Card, CardBody, Image } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

interface FavoriteCardPokemonProps {
    id: number
}

export const FavoriteCardPokemon: FC<FavoriteCardPokemonProps> = ({
    id
}) => {
    const router = useRouter()

    const onFavoriteClicked = () => {
        router.push(`/pokemon/${id}`)
    }
    return (
        <Card className='' shadow="sm" isHoverable isPressable onClick={onFavoriteClicked} style={{ height: '100%' }}>
            <CardBody>
                <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    alt='pokemon-img'
                    width='100%'
                    height={140}
                />
            </CardBody>
        </Card>
    )
}
