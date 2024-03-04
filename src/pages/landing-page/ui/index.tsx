import LandingLayout from "@/pages/layouts/landing-layout";

import s from './styles.module.css';

export const LandingPage = () => {
    return (
        <LandingLayout>
            <div className={s['wrapper']}>
                <div className={s['info-block']}>
                    <div className={s['info-text']}>
                        <h2>CRM system aimed at optimizing recruiting processes</h2>
                        <p>The goal of the project is to simplify and speed up the work of HR-specialists as much as possible by providing them with an intuitive and functional tool for effective recruitment.</p>
                    </div>
                </div>
                <div className={s['info-block']}>
                    <div className={s['info-text']}>
                        <h1>ADVANTAGES</h1>
                        <h2>Advantages of out product STELLA</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>
                <div className={s['info-block']}>
                    <div className={s['info-text']}>
                        <h1>ABOUT US</h1>
                        <h2>We are team BETA CHANCE</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>
            </div>
        </LandingLayout>
    )
}