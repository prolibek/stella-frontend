import s from './styles.module.css'

type SeachInputProps = {
    value?: string,
    onChange?: () => void,
    className?: any
}

const SearchInput:React.FC<SeachInputProps> = ({ value, onChange, className }) => {
    return (
        <div className={`${s.searchContainer} ${className}`}>
            <input value={value} onChange={onChange} type="text" placeholder="Search" className={s.searchBar}/>
            <img src="/images/searchIcon.png" className={s.searchIcon} />
        </div>
    )
}

export default SearchInput;