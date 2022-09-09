import { writable } from "svelte/store";


export const winkelwagen = writable({});

export const toevoegen = async (produkt, aantal) => {
    console.log(produkt, aantal)
}

