const Persons = ({ personToShow }) => {
    return (
        <>
            <h2>Numbers</h2>
            {personToShow.map(person => {
                return (
                    <p key={person.name}>{person.name}</p>
                )
            })}
        </>
    )
}

export default Persons