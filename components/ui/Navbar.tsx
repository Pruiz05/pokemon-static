import { Spacer } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
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

            <Link href='/'>
                <span className="font-bold text-inherit">
                    Pokemon
                </span>

            </Link>
            <Spacer style={{
                flex: 1
            }} />

            <Link href='/favorites'>
                <p> Favorites</p>
            </Link>
        </div>
    )
}
