
const Avatar = ({ children }) => {
    return (
        <>
            <div className="absolute -bottom-14 border-4 border-white rounded-full ml-8 h-28 w-28 text-3xl border- bg-indigo-600 flex items-center justify-center text-white font-medium mr-5">
                { children }
            </div>
        </>
    )
}

export default Avatar