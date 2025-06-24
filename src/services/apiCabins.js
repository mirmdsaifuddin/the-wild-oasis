import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins data could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("cabins couldn't be deleted");
  return data;
}

export async function createEditCabin(newCabin, id) {
  //https://jyunrinnclxhblkfkcuu.supabase.co/storage/v1/object/public/cabins-image//cabin-001.jpg
  //console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`;

  let query = supabase.from("cabins");
  //1.   create/Edit cabin
  //A.   Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //B.  edit Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();

  if (error) throw new Error("cabins couldn't be deleted");

  //2.   upload image
  if (hasImagePath) return data;
  const { erro: storageerror } = await supabase.storage
    .from("cabins-image")
    .upload(imageName, newCabin.image);

  //3.  if there was an error to upload image then delete the cabin
  if (storageerror) {
    await supabase.from("cabins").delete().eq("id", data.id);
    if (storageerror) console.error(storageerror);
    throw new Error(
      "cabins image couldn't be uploaded and the cabin was not created"
    );
  }
  return data;
}
