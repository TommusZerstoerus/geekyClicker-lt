import React from "react";

export type ResearchContextType = {
    isResearching: boolean
    setIsResearching: (isResearching: boolean) => void
}

export const ResearchContext = React.createContext<ResearchContextType | null>(null)

const ResearchProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isResearching, setIsResearching] = React.useState(false)

    return (
        <ResearchContext.Provider value={{isResearching, setIsResearching}}>
            {children}
        </ResearchContext.Provider>
    )
}

export default ResearchProvider