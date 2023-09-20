import { useContext } from 'react';

import { UserContext } from '@/context/userContext';

const useUserContext = () => useContext(UserContext);

export default useUserContext;
