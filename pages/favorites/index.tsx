import { Layout } from '@/components/layouts'
import { FavoritePokemons } from '@/components/pokemon'
import { NoFavorites } from '@/components/ui'
import { localFavorites } from '@/utils'
import { Card, Image } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

const FavoritePage = () => {
    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

    useEffect(() => {
        setFavoritePokemons(localFavorites.pokemons())
    }, [])

    return (
        <Layout title='Favorites Pokemons'>
            {favoritePokemons.length === 0 ? (
                <NoFavorites />
            ) : (
                <FavoritePokemons pokemons={favoritePokemons} />
            )}
        </Layout>
    )
}

export default FavoritePage
