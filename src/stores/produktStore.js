// import { writable } from "svelte/store";
// import { supabase } from "./supabase";

// export const produktStore = writable([]);
// export const categorien = writable([]);

// export const loadProdukten = async () => {
//     // producten importeren
//     const { data, error } = await supabase.from('producten').select('*');
//     //sorteren op volgorde van volgnummer
//     let volgorde = [...data];
//     volgorde.sort((a, b) => parseInt(a.volgnummer) - parseInt(b.volgnummer));

//     if (error) return error;
//     else produktStore.set(volgorde);

//     // categorien maken
//     const tijdcat = new Set();
//     let cats;

//     const unsub = produktStore.subscribe(value => { cats = value });
//     cats.forEach(element => {
//         tijdcat.add(element.categorie);
//     });
//     categorien.set([...tijdcat]);
//     unsub();
// }
// loadProdukten();
