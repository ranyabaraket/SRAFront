import { AutorisationDtoId } from "./autorisationDtoId";

export class AutorisationDto{

	id: AutorisationDtoId = new AutorisationDtoId()  
	 isActive;
	 dtCreate;
	 dtModif;
	 refUser;
	 version;
	 idUserTiers;


}