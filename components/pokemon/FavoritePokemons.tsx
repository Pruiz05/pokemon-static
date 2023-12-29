import { Card, Image } from '@nextui-org/react'
import React, { FC } from 'react'
import { FavoriteCardPokemon } from '.'

interface FavoritePokemonsProps {
    pokemons: number[]
}

export const FavoritePokemons: FC<FavoritePokemonsProps> = ({
    pokemons
}) => {
    //gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-2
    return (
        <div className='container grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2'>
            {pokemons.map((id) => (
                <FavoriteCardPokemon key={id} id={id} />
            ))}
        </div>
    )
}
