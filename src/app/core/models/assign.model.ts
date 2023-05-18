export interface Parking {
    id: number,
    docId?: string,
    startsAt: string,
    finishsAt: string,
    placeOwner: string,
    placeTenant : string,
    state: string,
    placeId: string
}