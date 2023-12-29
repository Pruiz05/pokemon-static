import { Image } from '@nextui-org/react'
import React from 'react'

export const NoFavorites = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1>
                There are no favorites
            </h1>
            <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/90.svg"
                alt='no-image'
                height={250}
                width={250}
                style={{
                    opacity: 0.1
                }}
            />
        </div>
    )
}
