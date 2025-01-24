export interface IAuthContextProps {
    user: { rule: number; uid: number };
    setUser: React.Dispatch<React.SetStateAction<{ rule: number; uid: number } | undefined>>;
}

export interface IAuthContextProviderProps {
    children: React.ReactNode;
}