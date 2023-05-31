export interface Parking {
    id: number,
    docId?: string,
    startsAt: string,
    finishsAt: string,
    placeOwner: string,
    state: string,
    placeId: string,
    tenantPicture: string,
    tenantEmail: string
}