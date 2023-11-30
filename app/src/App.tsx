// import { isUserLoggedIn } from './logic'
import AppContext from "./AppContext";
import {
    Home,
    Register,
    Login,
    Profile,
    UploadProduct,
    ProductPage,
    ShowProducts,
    CartPage,
} from "./view/pages";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, Header } from "./view/components";
import { LoaderContent } from "./view/components";
import { isUserLoggedIn } from "./logic";
import serverStatus from "./logic/helpers/serverStatus";
import { useHandleErrors } from "./view/hooks";

const { Provider } = AppContext;

type LevelProps = "error" | "warning" | "info";

interface FeedbackProps {
    error: string;
    level: LevelProps;
}

function App() {
    const handleErrors = useHandleErrors();

    const [feedback, setFeedback] = useState<FeedbackProps | undefined>();
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
    const [menu, setMenu] = useState(false);
    const [_, setServerStatusResponse] = useState(false);

    const checkServer = async () => {
        const res = await serverStatus();

        if (res === 200) {
            setServerStatusResponse(true);
            unfreeze();
        } else {
            setServerStatusResponse(false);
            unfreeze();
            throw new Error("Connection error");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            handleErrors(async () => {
                await checkServer();
            });
        };

        fetchData();
    }, []);

    type AlertArgs = (error: string, level: LevelProps) => void;

    const alert: AlertArgs = (error, level = "info") => {
        document.body.classList.add("overflow-hidden");

        setFeedback({ error, level });
    };

    const handleOnAcceptAlert = () => {
        document.body.classList.remove("overflow-hidden");

        setFeedback(undefined);
    };

    const freeze = () => {
        document.body.classList.add("overflow-hidden");

        setLoader(true);
    };
    const unfreeze = () => {
        document.body.classList.remove("overflow-hidden");

        setLoader(false);
    };

    const handleToggleMenu = () => setMenu(!menu);

    console.log("Routes -> render");

    return (
        <Provider
            value={{
                alert,
                navigate,
                freeze,
                unfreeze,
                lastUpdate,
                setLastUpdate,
            }}
        >
            <Header/>
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="show-products" element={<ShowProducts />} />
                <Route
                    path="profile"
                    element={
                        isUserLoggedIn() ? (
                            <Profile
                                menu={menu}
                                handleToggleMenu={handleToggleMenu}
                            />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="upload-product"
                    element={
                        isUserLoggedIn() ? (
                            <UploadProduct />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="cart"
                    element={
                        isUserLoggedIn() ? (
                            <CartPage
                                menu={menu}
                                handleToggleMenu={handleToggleMenu}
                            />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>

            {loader && <LoaderContent />}
            {feedback && (
                <Alert
                    error={feedback.error}
                    level={feedback.level}
                    onAccept={handleOnAcceptAlert}
                />
            )}
        </Provider>
    );
}

export default App;
