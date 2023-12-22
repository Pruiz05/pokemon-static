
import React, { FC } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { SmallPokemon } from "@/interfaces";
import { useRouter } from "next/router";

interface PokemonCardProps {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<PokemonCardProps> = ({
    pokemon
}) => {

    const router = useRouter()

    const onClick = () => {
        router.push(`/pokemon/${pokemon.id}`)
    }
    return (
        <Card shadow="sm" isPressable onClick={onClick}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col">
                <p className="text-tiny uppercase font-bold">{pokemon.name}s</p>
                <small className="text-default-500"># {pokemon.id}</small>
                {/* <h4 className="font-bold text-large">Frontend Radio</h4> */}
            </CardHeader>
            <CardBody className="place-items-center p-1 ">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={pokemon.img}
                    width='100%'
                    height={140}
                />
            </CardBody>
        </Card>
    )
}
