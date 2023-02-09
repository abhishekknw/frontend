import { getRequestWithToken } from './request';


const Base_url = "/v0/ui/b2b/";
export const getDecisionPendingList = (leadType,search) =>{
    let url = Base_url + "lead-decision-panding/?lead_type=" + leadType + "type_of_entity=all&next_page=0&user_type=undefined&search="+search
    return getRequestWithToken("", url);
} 
