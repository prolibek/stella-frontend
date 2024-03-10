import { useSelector } from 'react-redux';
import s from './styles.module.css';
import { useNavigate, useParams } from 'react-router-dom';

export const Sidebar = () => {
    const user = useSelector(state => state.auth.user);

    const navigate = useNavigate();
    const { key } = useParams();

    return (
        <div className={s.sidebar}>
            <div className={s.sidebarContent}>
                {
                    user.role === 1 ?
                    <>
                        <button className={s.sidebarBtn}>
                            Resumes
                        </button>
                        <button className={s.sidebarBtn}>
                            Vacancies
                        </button>
                        <button className={s.sidebarBtn}>
                            Applications
                        </button>
                        <button className={s.sidebarBtn}>
                            Analytics
                        </button>
                    </>
                    :
                    <>
                        <button
                            onClick={() => {
                                navigate(`/organisations/${key}/vacancy-requests`)
                            }} 
                            className={s.sidebarBtn}
                        >
                            My vacancy requests
                        </button>
                        <button
                            onClick={() => {
                                navigate(`/organisations/${key}/vacancies`)
                            }}  
                            className={s.sidebarBtn}
                        >
                            My vacancies
                        </button>
                        <button 
                            onClick={() => {
                                navigate(`/organisations/${key}/resumes`)
                            }}  
                            className={s.sidebarBtn}
                        >
                            Resumes
                        </button>
                    </>
                }
            </div>
        </div>
    )
}