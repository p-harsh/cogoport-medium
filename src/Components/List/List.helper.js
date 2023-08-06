export const handleListShare = (setIsCopied) => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
        setIsCopied(false);
    }, 2000);
};