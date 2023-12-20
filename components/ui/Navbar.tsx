import { Spacer } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React from 'react'

export const Navbar = () => {

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0px 16px',
            backgroundColor: '#3F3F46'
        }}>
            <Image src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png'} alt='pokemon-img' width={70} height={70} />
            <h3 className="font-bold text-inherit">P</h3>
            <h4>okemon</h4>
            <Spacer style={{
                flex: 1
            }} />
            <p> Favoritos</p>
        </div>
    )
}
