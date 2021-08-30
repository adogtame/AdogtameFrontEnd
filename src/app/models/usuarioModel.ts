export interface Usuario{
	id?: number;
	tipo_perfil?: string;
	email?: string;
	pasword?: string;
	nro_celular?:number;
	dni?: number;
	calle?: string;
	nro_calle?: number;
	tipo_dni?: string;
	nombre?: string;
	apellido?: string;
	fecha_nacimiento?: Date;
	fecha_ingreso?: Date;
	razon_social?: string;
	cuit?: string;
}

export interface Animal{
	id?: number;
	idDador?: number;
	nombre?: string;
	sexo?: string;
	tipo?: string;
	fNac?: Date;
	tamano?: string;
	peso?:number;
}