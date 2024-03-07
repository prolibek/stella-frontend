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
        <div className={s.logoContainer}>
            <img 
                src={star} 
                className={s.logoImg}
                style={{
                    height: imgHeight | 36
                }}
            />
            <p 
                className={s.logoText} 
                style={{
                    fontSize: fontSize | 26
                }}
            >STELLA</p>
        </div>
    )
}

export default StellaLogo;