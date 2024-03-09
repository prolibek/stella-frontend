import s from './styles.module.css';

import star from './star.png';

type LogoProps = {
    fontSize: number,
    imgHeight: number
}

const StellaLogo: LogoProps = ({
    imgHeight,
    fontSize
}) => {
    return (
        <div 
            className={s.logoContainer} 
            style={{height: imgHeight | 36}}
        >
            <img 
                src={star} 
                className={s.logoImg}
            />
            <h1 
                className={s.logoText}
                style={{
                    fontSize: imgHeight - 12 | 24
                }} 
            >STELLA</h1>
        </div>
    )
}

export default StellaLogo;