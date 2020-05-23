import React, {useState} from 'react'

import CreateMemoryForm from "../components/memoryForm.component"

import RecentMemories from "../components/recentMemories.component"

import {CreateMemoryContextProvider} from "../contexts/createMemory.context"

const HomePageLoggedIn = () => {
    return (
        <main>
            <CreateMemoryContextProvider>
            <div className="container">
                <CreateMemoryForm />
                <RecentMemories />
            </div>
            </CreateMemoryContextProvider>
            
        </main>
    )
}

export default HomePageLoggedIn