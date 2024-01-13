export const useRandomBorderRadius = () => {
    const petalStyles = ['0px 220px', '220px 0px', '120px 0px'];
    return petalStyles[Math.floor(Math.random() * petalStyles.length)];
};
