import Head from 'next/head'
import React, { FC, ReactNode } from 'react'
import { Navbar } from '../ui';

interface LayoutProps {
    children: ReactNode;
    title?: string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin


export const Layout: FC<LayoutProps> = ({ children, title }) => {


    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name='author' content='Pedro Luis' />
                <meta name='description' content={`Información sobre el pokemon ${title}`} />
                <meta name='keywords' content={`${title}, pokemon, pokedex`} />
                {/* og meta tags */}
                <meta property="og:title" content={`Information about ${title}`} />
                <meta property="og:description" content={`This is the page about $title{}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>

            <Navbar />

            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>

        </>
    )
}