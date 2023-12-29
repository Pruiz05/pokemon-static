import { HeartIcon } from '@/components/icons'
import { Layout } from '@/components/layouts'
import { Pokemon } from '@/interfaces'
import { getPokemonInfo, localFavorites } from '@/utils'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'
import confetti from 'canvas-confetti'

interface PokemonPageProps {
    pokemon: Pokemon
}

const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {
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


// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string }

    const pokemon = await getPokemonInfo(id)

    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 24 hours
        revalidate: 86400, // in seconds
    }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`)

    const paths = pokemon151.map(id => ({
        params: { id }
    }))

    return { paths, fallback: 'blocking' }
}


export default PokemonPage