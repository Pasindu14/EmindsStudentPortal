import { useEffect } from 'react';
import { errorToast,successToast } from "../components/Toast";

export const useHandleErrors = (hasErrors, statusMessage) => {
  useEffect(() => {
    if (hasErrors) {
        if(statusMessage!==""){
            errorToast(statusMessage);
        }
    }
    else{
        if(statusMessage!==""){
            successToast(statusMessage)
        }
    }
  }, [hasErrors, statusMessage]);
};

export default useHandleErrors;