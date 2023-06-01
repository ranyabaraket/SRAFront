import { commissionAgentDtoId } from "./commission-agentDtoId";

export class commissionAgentDto {
    txAgMarkup;
    mntAgMarkup;
    
    Modules;
    dtCreate;
    dtModif;

    id: commissionAgentDtoId = new commissionAgentDtoId();
    refUser;
    version;
}
