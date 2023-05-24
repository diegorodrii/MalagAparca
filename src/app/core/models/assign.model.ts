export interface Parking {
    id: number,
    docId?: string,
    startsAt: string,
    finishsAt: string,
    placeOwner: string,
    placeTenant : string,
    placeNumber: number,
    state: string,
    placeId: string
}