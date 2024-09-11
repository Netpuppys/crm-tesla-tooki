import { useUserContext } from 'globalComponents/AppContext'
import React from 'react'

const Alert = () => {
    const { alert } = useUserContext()

    if (!alert) {
        return
    }

    return (
        <div className="fixed shadow-2xl animate-slideIn z-[999] top-5 right-10  px-10 py-2 text-lg font-medium text-center bg-white rounded-full border-2 border-orange-600">
            {alert}
        </div>
    )
}

export default Alert