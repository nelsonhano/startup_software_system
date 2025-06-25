import React, { ReactNode } from 'react';

import { SanityLive } from '@/sanity/lib/live';
import Navbar from '@/components/Navbar'

export default function layout({ children }: { children: ReactNode }) {
return (
    <main>
        <Navbar />
    
        {children}
        <SanityLive />
    </main>
)}
