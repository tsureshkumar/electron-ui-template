const key = "jiratron";
export const loadState = () => {
  try {
    const state = (localStorage.getItem(key));
    if (state === null) return undefined;
    return JSON.parse(state);
  } catch (err) {
    console.log("cannot load persisted store");
    return undefined;
  }
};
export const storeState = (state) => {
  try {
    if (state !== undefined) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  } catch (err) {
    console.log("cannot load persisted store");
  }
};
