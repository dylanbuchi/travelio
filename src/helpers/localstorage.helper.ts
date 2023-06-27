function checkWindowExists() {
  return typeof window !== "undefined";
}

export function loadFromLocalStorage(key: string) {
  try {
    if (checkWindowExists()) return JSON.parse(localStorage.getItem(key) ?? "");
  } catch (error) {
    console.error(error);
  }
}

export function setToLocalStorage(key: string, item: unknown) {
  try {
    if (checkWindowExists()) localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(error);
  }
}
