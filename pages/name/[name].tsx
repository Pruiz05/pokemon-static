
import { pokeApi } from '@/api'
import { HeartIcon } from '@/components/icons'
import { Layout } from '@/components/layouts'
import { Pokemon, PokemonListResponse } from '@/interfaces'
import { getPokemonInfo, localFavorites } from '@/utils'
import { Card, CardBody, CardHeader, Button, Image } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { FC, useState } from 'react'

interface PokemonByNamePageProps {
    pokemon: Pokemon
}


const PokemonByNamePage: FC<PokemonByNamePageProps> = ({
    pokemon
}) => {
    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))
    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)
        if (isInFavorites) return

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: { x: 1, y: 0 }
        });
    }
    return (
        <Layout title={pokemon.name}>
            <div className='container mx-auto px-4 pt-2'>
                <div className='grid grid-cols-4 gap-4'>
                    <div className='col-span-4 md:col-span-1'>
                        <Card isHoverable className='p-7 w-full'>
                            <CardBody>
                                <Image
                                    alt={pokemon.name}
                                    src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                    width='100%'
                                    height={200}
                                />
                            </CardBody>
                        </Card>
                    </div>

                    <div className='col-span-4 md:col-span-3'>
                        <Card className='p-7 w-full'>
                            <CardHeader className='flex justify-between'>
                                <h1 className='text-prettys capitalize'> {pokemon.name}</h1>
                                <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" startContent={<HeartIcon />} onClick={onToggleFavorite}
                                >
                                    {
                                        isInFavorites ? (<p>In Favorites</p>) : (<p>Save</p>)
                                    }
                                </Button>
                            </CardHeader>
                            <CardBody>
                                <h3>
                                    Sprites:
                                </h3>
                                <div className='flex'>
                                    <div className='relative flex-1 max-w-none'>
                                        <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                                    </div>
                                    <div className='relative flex-1 max-w-none'>
                                        <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100} />
                                    </div>
                                    <div className='relative flex-1 max-w-none'>
                                        <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
                                    </div>
                                    <div className='relative flex-1 max-w-none'>
                                        <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100} />
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name)

    return {
        paths: pokemonNames.map(name => ({
            params: { name }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string }
    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}

export default PokemonByNamePage