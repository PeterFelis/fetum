import { supabase } from "../stores/supabase";

export const producten = async () => {
    let { data: producten, error } = await supabase
        .from('producten')
        .select('*')
    return producten
}