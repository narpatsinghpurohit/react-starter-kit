import React from 'react'
import { Header } from '../components/Header/Header'

export const MainLayout = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <div>
            {/* Header content */}
            <Header />
            <main>
                {/* Render the main content of the page */}
                {children}
            </main>
            <footer>
                {/* Footer content */}
            </footer>
        </div>
    )
}

export default MainLayout;