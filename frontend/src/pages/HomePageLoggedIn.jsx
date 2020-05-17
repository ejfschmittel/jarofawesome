import React from 'react'

import CreateMemoryForm from "../components/memoryForm.component"

import RecentMemories from "../components/recentMemories.component"

const HomePageLoggedIn = () => {
    return (
        <main>

            <div className="container">
                <CreateMemoryForm />
                <RecentMemories />
            </div>
            
        </main>
    )
}

export default HomePageLoggedIn