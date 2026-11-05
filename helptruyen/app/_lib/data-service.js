import { constants } from "../_constants/page";
import { supabase } from "./supabase";

// Dùng để làm đăng nhập
// Kiểm tra email của bảng users
export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // Không tạo error ở đây vì chúng ta sẽ chuẩn bị 1 trường hợp không có email bên trong auth.js
  return data;
}

export async function GetNameUser(name) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("fullName", name)
    .single();

  return data;
}

// cái create duy nhất mà sẽ tạo ở data-service
export async function createUser(newUser) {
  const { data, error } = await supabase.from("users").insert([newUser]);

  if (error) {
    throw new Error("User cannot create");
  }

  return data;
}

export const getUserInPage = async function (id) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("get user failed");
  }

  return data;
};

export const getNewChapterAndDate = async function (mangas_id) {
  let { data, error } = await supabase
    .from("chapters")
    .select("created_at, number")
    .eq("mangas_id", mangas_id)
    .order("number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error("get new chapter and date failed");
  }

  return data;
};

export const getNewChapterInMangas = async function (carousel = false) {
  const { data, error } = await supabase
    .from("chapters")
    .select("id, mangas_id, number, created_at, mangas(title, description, image_background, image_main)")
    .order("created_at", { ascending: false });

  if (error) throw new Error("get new chapter failed");

  let unique = [
    ...new Map(data.map(item => [item.mangas_id, item])).values()
  ];

  if(carousel){
    unique=  unique.slice(0,5);
  }

  return unique;
};

export const getBigNumber = async function (manga_id) {
  let { data, error } = await supabase
    .from("chapters")
    .select("number")
    .eq("mangas_id", manga_id)
    .order("number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error("get big number fail");
  }

  return data;
};

export const getMangasUser = async function (id) {
  let { data, error } = await supabase
    .from("mangas")
    .select("*")
    .eq("user_id", id)
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("get manga failed");
  }

  return data;
};

export const getManga = async function (id) {
  let { data, error } = await supabase
    .from("mangas")
    .select(`*, users(fullName, image)`)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("get manga failed");
  }

  return data;
};


export const getTypes = async function () {
  let { data, error } = await supabase
    .from("types")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error("get type failed");
  }

  return data;
};

export const getTypesForManga = async function () {
  let { data, error } = await supabase
    .from("manga_genres")
    .select(
      `id,manga_id ,type_id,
    types (
      id, 
      title
    )`,
    )
    .order("id", { ascending: true });

  if (error) {
    throw new Error("get type in manga failed");
  }

  return data;
};

export const getChapters = async function (boolen, user_id, page, mangas_id) {
  const { pageSize } = await constants();
  let query = supabase
    .from("chapters")
    .select("*", { count: "exact" })
    .eq("mangas_id", mangas_id)
    .order("number", { ascending: boolen });

  if (page) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
  }

  if (user_id) {
    query = query.eq("user_id", user_id);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("get chapters failed");
  }

  return { data, count };
};

export const getChapter = async function (id) {
  let { data, error } = await supabase
    .from("chapters")
    .select("*, mangas(user_id)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("get chapter failed");
  }

  return data;
};

export const getPrevAndNextChapter = async function (id, number) {
  const [prev, next] = await Promise.all([
    supabase
      .from("chapters")
      .select("*")
      .eq("mangas_id", id)
      .lt("number", number)
      .order("number", { ascending: false })
      .limit(1)
      .maybeSingle(),

    supabase
      .from("chapters")
      .select("*")
      .eq("mangas_id", id)
      .gt("number", number)
      .order("number", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  return {
    prev: prev.data,
    next: next.data,
  };
};

export const getImageChapter = async function () {
  let { data, error } = await supabase
    .from("chapter_images")
    .select("*")
    .order("number", { ascending: true });

  if (error) {
    throw new Error("get image chapter failed");
  }

  return data;
};

export const getImageChapterWithId = async function (id) {
  let { data, error } = await supabase
    .from("chapter_images")
    .select("*")
    .eq("chapter_id", id)
    .order("number", { ascending: true });

  if (error) {
    throw new Error("get image chapter failed");
  }

  return data;
};

export const getSetting = async function () {
  let { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    throw new Error("get image chapter failed");
  }

  return data;
};

export const getComments = async function (manga_id, chapter_id) {
  let { data, error } = await supabase
    .from("comments")
    .select("*,users(fullName)")
    .eq("mangas_id", manga_id)
    .eq("chapters_id", chapter_id)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("get comments chapter failed");
  }

  return data;
};
