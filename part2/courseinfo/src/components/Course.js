const Header = ({ course }) => {
    return (
        <h2> {course} </h2>
    )
}

const Part = ({ part, exercise }) => {
    return (
        <>
            <p>{part} {exercise}</p>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part.name} exercise={part.exercises} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    const sumOfTotal = parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises, 0
    )
    return (
        <>
            <p><b>Total of {sumOfTotal} exercises</b></p>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {
                course.map(
                    course => {
                        return (
                            <div key={course.id}>
                                <Header course={course.name} />
                                <Content parts={course.parts} />
                                <Total parts={course.parts} />
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default Course