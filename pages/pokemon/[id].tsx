import { pokeApi } from '@/api'
import { HeartIcon } from '@/components/icons'
import { Layout } from '@/components/layouts'
import { Pokemon } from '@/interfaces'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
interface PokemonPageProps {
    pokemon: Pokemon
}

const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {
    const router = useRouter();

    console.log(router.query)


    return (
        <Layout title='Algun pokemon'>
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

                                <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" startContent={<HeartIcon />} onClick={() => { console.log() }}>
                                    Favoritos
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

    const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`)
    return {
        paths: pokemon151.map(id => ({
            params: { id }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string }

    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

    return {
        props: {
            pokemon: data
        }
    }
}

export default PokemonPage