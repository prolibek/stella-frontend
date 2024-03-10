interface ICEO {
    first_name: string,
    last_name: string
}

export interface IOrganisation {
    ceo: ICEO | null,
    name: string,
    slug: string
}