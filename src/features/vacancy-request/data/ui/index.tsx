import s from './styles.module.css'

export const VacancyData = ({vacancy}) => {
    return (
        <div>
        {
            vacancy.public_data && 
            Object.entries(vacancy.public_data).map(([key, value], index) => (
                <div className={s.dataItem} key={index}>    
                    <h3>{key}:</h3>
                    <span dangerouslySetInnerHTML={{__html: value}}></span>
                </div>
            ))
        }
        </div>
    )
}