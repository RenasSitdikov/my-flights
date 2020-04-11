const searchURL = 'https://www.planespotters.net/search?q=';
const getSearchLink = (reg: string) => `${searchURL}${reg}`;

export default getSearchLink;
