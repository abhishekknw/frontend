import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { alertAtom } from '../_state/alert';
import { useSnackbar } from 'notistack';
const useAlertActions = () => {
  const { enqueueSnackbar } = useSnackbar();
  const setAlert = useSetRecoilState(alertAtom);
  return {
    success: (message) => {
      enqueueSnackbar(message, { variant: 'success' });
      setAlert({ open: true });
    },
    error: (message) => {
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
      setAlert({ open: true });
    },
  };
};

export { useAlertActions };
