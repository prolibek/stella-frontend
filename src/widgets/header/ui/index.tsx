import { NavLink, useNavigate } from 'react-router-dom';
import s from './styles.module.css';

export const Header = () => {
  let navigate = useNavigate();

  function handleRegisterClick() {
    navigate('/register');
  }

  function handleSignInClick() {
    navigate('/signin');
  }

  return (
    <div className={s['wrapper']}>
      <div className={s["container"]}>
        <div className={s["text"]}>
          <nav className={s["navigation"]}>
            <NavLink to="/" className={s["nav-link"]}>Home</NavLink>
            <NavLink to="/" className={s["nav-link"]}>About us</NavLink>
            <NavLink to="/" className={s["nav-link"]}>Mission</NavLink>
            <NavLink to="/" className={s["nav-link"]}>Advantages</NavLink>
            <NavLink to="/help" className={s["nav-link"]}>Help</NavLink>
          </nav>
        </div>
        <div className={s["auth-buttons"]}>
          <button className={s["auth-btn"]} onClick={handleRegisterClick}>Register</button>
          <button className={s["auth-btn"]} onClick={handleSignInClick}>Sign in</button>
        </div>
      </div>
    </div>
  )
}