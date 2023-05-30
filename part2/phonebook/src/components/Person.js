const Persons = ({ personToShow, deletePerson}) => {
    return (
        <>
            <h2>Numbers</h2>
            {personToShow.map(person => {
                return (
                    <p key={person.id}>{person.name} {person.number}
                        <button onClick={() => deletePerson(person)}>delete</button>
                    </p>
                )
            })}
        </>
    )
}

export default Persons