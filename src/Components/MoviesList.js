import styles from './MoviesList.module.css'


const MoviesList = (props) => {

    const movies = props.movies.map(movie => (
        <li key={movie.id} className={styles.movie}>
            <h2>{movie.title}</h2>
            <p>{movie.openingText}</p>
        </li>
    ))

    return(
        <ul className={styles.movies}>
            {movies}
        </ul>
    )
};


export default MoviesList;