const ROUTES={
    HOME: "/",
    LOGIN: "/Login",
    REGISTER: "/Register",
    PROFILE: (userId: string) => (`/profile/${userId}`),
    EDIT_PROFILE: "/profile/edit",
}

export default ROUTES;