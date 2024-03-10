import s from './styles.module.css';
import { IOrganisation } from '../model';

type OrganisationCardProps = {
    organisation: IOrganisation
}

export const OrganisationCard: React.FC<OrganisationCardProps> = ({
    org
}) => {
    return (
        <div className={s.orgCard}>
            <div className={s.orgName}>
                <img />
                <div className={s.nns}>
                    <h3>{org.name}</h3>
                    <p>/{org.slug}</p>
                </div>
            </div>
            <div className={s.orgInfo}>
                <p>{ org.ceo ? org.ceo : "No CEO yet"}</p>
            </div>
        </div>
    )    
}