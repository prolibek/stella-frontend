import s from './styles.module.css'

type SeachInputProps = {
    className?: any
}

const SearchInput:React.FC<SeachInputProps> = ({ className }) => {
    return (
        <div className={`${s.searchContainer} ${className}`}>
            <input type="text" placeholder="Search" className={s.searchBar}/>
            <img src="/images/searchIcon.png" className={s.searchIcon} />
        </div>
    )
}

export default SearchInput;