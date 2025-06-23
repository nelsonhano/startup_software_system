import Navbar from '@/components/Navbar'
import { SanityLive } from '@/sanity/lib/live'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
return (
    <main>
        <Navbar />
    
        {children}
        <SanityLive />
    </main>
)}
