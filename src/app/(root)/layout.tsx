import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
return (
    <main>
        <Navbar />
    
        {children}
    </main>
)}
