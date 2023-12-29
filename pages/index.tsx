import { Inter } from 'next/font/google'
import { GetStaticProps } from 'next';
import { NextPage } from 'next'
import { Layout } from '@/components/layouts'
import { pokeApi } from '@/api';
import { SmallPokemon, PokemonListResponse } from '@/interfaces';
import { PokemonCard } from '@/components/pokemon';

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  pokemons: SmallPokemon[]
}

const Home: NextPage<HomeProps> = ({ pokemons }) => {
  return (
    <Layout>
      <div className="gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-2">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map((pokemon, i) => ({
    ...pokemon,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}


export default Home