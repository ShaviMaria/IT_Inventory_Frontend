const useDate = (type) => {
    switch(type) {
        case 'currentFullDate':
            const currentDate = new Date()
            const year = currentDate.getFullYear().toString()
            const month = currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : "0" + (currentDate.getMonth() + 1)
            const day = currentDate.getDate() >= 10 ? currentDate.getDate().toString() : `0${currentDate.getDate()}`
            const currentDateStr = year + "-" + month + "-" + day
            return currentDateStr
    }
}

export default useDate