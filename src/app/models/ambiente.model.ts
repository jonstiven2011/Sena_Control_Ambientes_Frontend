export class UsuarioModel {
    name: string;
    cuentadante: string;
    furnitures: {
        furnitures_name: string,
        furnitures_description: string,
        furnitures_quantity: number,
    };
    equipment: {
        equipment_name: string,
        equipment_description: string,
        equipment_quantity: number,
    };
}