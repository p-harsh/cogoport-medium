import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            "pk_test_51Nb7DLSFG1cPP0H6sLXJtI0VIySB0gu6zkZuiAcbQEcCyAdEjDhNYqS2yOctLcIjy60ima2vczFAjB5KHq297tMj00tvSv7mDB"
        );
    }
    return stripePromise;
};

export default getStripe;
