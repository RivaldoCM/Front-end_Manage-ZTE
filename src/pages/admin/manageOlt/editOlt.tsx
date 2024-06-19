import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getOlt } from "../../../services/apiManageONU/getOlt";
import { useResponse } from "../../../hooks/useResponse";
import { AccessConfig, BasicConfig, OltStyledContainer, VlanConfig } from "./style";
import { IOlt } from "../../../interfaces/IOlt";

export function EditOlt(){
    let { id } = useParams();
    const { setFetchResponseMessage } = useResponse();

    const [olt, setOlt] = useState<IOlt>();
    const [form, setForm] = useState({
        ip: olt?.host,
    });

    useEffect(() => {
        async function olts(){
            const response = await getOlt(parseInt(id!));
            if(response){
                if(response.success){
                    setOlt(response.responses.response);
                } else {
                    setFetchResponseMessage(response.messages.message);
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
            }
        }
        olts();
    }, []);

    return(
        <OltStyledContainer className="flex">
            <BasicConfig className="flex">

            </BasicConfig>
            <AccessConfig className="flex">

            </AccessConfig>
            <VlanConfig className="flex">

            </VlanConfig>
        </OltStyledContainer>
    )
}