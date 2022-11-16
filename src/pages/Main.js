import GoogleLoginButton from "../components/common/GoogleLoginButton";

function Main() {
    console.log(localStorage.getItem("TOKEN"));
    return <GoogleLoginButton />;
}

export default Main;
