type User = {
    auth: boolean;
    username: string;
}

type AuthorizationProps = {
    setUser: React.Dispatch<React.SetStateAction<User>>;
}