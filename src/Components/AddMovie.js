import React, {useRef} from 'react';

import styles from './AddMovie.module.css';
import Button from './UI/Button'

const AddMovie = (props) => {

    const inputTitleRef = useRef('');
    const openingtextRef = useRef('');
    const releasedAtRef = useRef('');

    const submitHandler = (event)=>{
        event.preventDefault();
        const film = {
            title: inputTitleRef.current.value,
            openingText: openingtextRef.current.value,
            releasedAt: releasedAtRef.current.value
        }

        props.onAddMovie(film)
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles['form-control']}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" ref={inputTitleRef}/>
            </div>
            <div className={styles['form-control']}>
                <label htmlFor="opening-text">Opening Text</label>
                <textarea id="opening-text" name="opening-text" rows='5' ref={openingtextRef}/>
            </div>
            <div className={styles['form-control']}>
                <label htmlFor="date">Release Date</label>
                <input type="text" id="date" name="date" ref={releasedAtRef}/>
            </div>
            <div className={styles['form-actions']}>
                <Button type="submit">Add Movie</Button>
            </div>
        </form>
    )

};


export default AddMovie;