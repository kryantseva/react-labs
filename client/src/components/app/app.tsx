import { Favorites } from "../../pages/favorites/favorites";
import { Login } from "../../pages/login/login";
import { MainPage } from "../../pages/main-page/main-page";
import { Offer } from "../../pages/offer/offer";
import { NotFound } from "../../pages/not-found/not-found";

function App() {
    return(
        <>
            <MainPage />
            <Favorites />
            <Login />
            <Offer />
            <NotFound />
        </>
    )
}

export { App };