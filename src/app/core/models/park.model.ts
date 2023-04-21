export interface Park {
    id: number,
    image?: string;
    location: string;
    price: string;
    asignado: boolean; //True si el park está asignado a otro usuario
}