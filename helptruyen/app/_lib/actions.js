"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { createUser, getImageChapterWithId, GetNameUser } from "./data-service";
import { auth, signIn, signOut, unstable_update } from "./auth";
import { constants } from "../_constants/page";

// authentical ///////////////////////////////
export async function signInAccountWithGoogle() {
  await signIn("google", { redirectTo: "/account" });
}

// useActionState sẽ tự truyền thêm tham số đầu tiên vào function, nên để formData ko bị ảnh hưởng cần chèn 1 cái lên đầu, ở đây thì chèn state
export async function signInWithUserAccount(state, formData) {
  const username = formData.get("Username");
  const password = formData.get("Password");

  if (!username && !password) {
    return { error: "không được để trống ô" };
  }
  if (!password) {
    return { error: "Nhập mật khẩu" };
  }
  if (!username) {
    return { error: "Nhập tên tài khoản" };
  }

  try {
    await signIn("credentials", { username, password, redirectTo: "/account" });
  } catch (error) {
    // signIn sẽ ném 1 lỗi để kích hoạt redirectTo, nên khi tạo catch nên lọc các error hỏng thật sự ("CredentialsSignin","CallbackRouteError") bằng if
    if (error?.type === "CredentialsSignin") {
      return { error: "Mật khẩu không chính xác." };
    }
    if (error?.type === "CallbackRouteError") {
      return { error: "Tài khoản không tồn tại." };
    }
    //  sau đó dùng throw error để ném các lỗi còn lại bao gồm lỗi signIn cố tình tạo để kích hoạt redirectTo
    throw error;
  }

  return { error: null };
}

export async function registerUserAccount(state, formData) {
  const bcrypt = require("bcrypt");
  const saltRounds = 12;
  const { imageAvarta } = await constants();

  const username = formData.get("Username");
  const existUser = await GetNameUser(username);
  const password = formData.get("Password");
  const redoPassword = formData.get("RedoPassword");

  const hashPass = await bcrypt.hash(password, saltRounds);

  if (!username) {
    return { error: "Nhập ô tài khoản" };
  }
  if (!password) {
    return { error: "Nhập ô mật khẩu" };
  }
  if (password.length < 6) {
    return { error: "Mật khẩu cần ít nhất 6 ký tự" };
  }
  if (!redoPassword) {
    return { error: "Nhập ô mật khẩu nhập lại" };
  }
  if (password !== redoPassword) {
    return { error: "Mật khẩu và mật khẩu nhập lại không giống nhau" };
  }
  if (existUser) {
    return { error: "Tài khoản đã tồn tại rồi, đổi tên đi" };
  }

  await createUser({
    fullName: username,
    password: hashPass,
    image: imageAvarta,
  });
  // không cần dùng try catch vì 2 trường hợp giống ở trên sẽ ko diễn ra ở đây
  // cơ chế của signIn sẽ tạo lỗi để gọi về kích hoạt redirectTo, nếu catch vô tội vạ sẽ không kích hoạt đc redirectTo
  await signIn("credentials", {
    username: username,
    password: password,
    redirectTo: "/account",
  });

  return { error: null };
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// insert ////////////////////////////////////
export async function createManga(formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const { backgroundStart, imageStart } = await constants();

  const image_background = backgroundStart;
  const image_main = imageStart;

  const newManga = {
    title: formData.get("title"),
    author: formData.get("author"),
    description: formData.get("description"),
    image_background,
    image_main,
    user_id: session.user.userId,
  };

  const { data, error } = await supabase
    .from("mangas")
    .insert(newManga)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/account");
  return data;
}

export async function insertTypeForManga(formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const manga_id = formData.get("id");
  const type_id = formData.get("type");
  const user_id = +session.user.userId;

  const { data, error } = await supabase
    .from("manga_genres")
    .insert([{ manga_id, type_id, user_id }])
    .select();

  if (error) {
    throw new Error("insert Type for Manga");
  }

  revalidatePath(`/account/detail/${manga_id}`);
  return data;
}

export async function insertChapter(formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const name = formData.get("name");
  const number = formData.get("number");
  const mangas_id = formData.get("mangas_id");
  const user_id = +session.user.userId;

  const { data, error } = await supabase
    .from("chapters")
    .insert([{ name, number, mangas_id, user_id }])
    .select();

  if (error) {
    throw new Error("insert chapter failed");
  }

  revalidatePath(`/account/detail/${mangas_id}`);
  return data;
}

export async function insertImageChapter(formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const { imageStart } = await constants();

  const image = imageStart;
  const number = formData.get("number");
  const id = formData.get("id");
  const setId = formData.get("setId");
  const user_id = +session.user.userId;

  const { data, error } = await supabase
    .from("chapter_images")
    .insert([{ chapter_id: setId, number, image, user_id }])
    .select();

  if (error) {
    throw new Error("insert chapter failed" + error.message);
  }

  revalidatePath(`/account/detail/${id}/setup/${setId}`);
  return data;
}

export async function insertComment(mangas_id, chapters_id, formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const comment = formData.get("comment");

  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        content: comment,
        users_id: session.user.userId,
        mangas_id,
        chapters_id,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/chapter/${mangas_id}/chap/${chapters_id}`);

  return data;
}

// update ////////////////////////////////////
export async function updateDetailManga(detail, formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const title = formData.get("title");
  const id = formData.get("id");

  const { data, error } = await supabase
    .from("mangas")
    .update({ [detail]: title })
    .eq("id", id)
    .eq("user_id", +session.user.userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/account/detail/${id}`);
  return data;
}

export async function updateSetting(detail, formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const title = formData.get("title");

  const { data, error } = await supabase
    .from("settings")
    .update({ [detail]: title })
    .eq("id", 1)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/account/setting`);
  return data;
}

export async function updateImage(img, formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const image = formData.get("image");
  const id = formData.get("id");

  // Cũng để chuẩn bị update ảnh
  const nameImageBackground = `${Math.random()}-${image.name}`.replaceAll(
    "/",
    "",
  );
  const imageBackgroundPath = `${SUPABASE_URL}/storage/v1/object/public/manga-images/${nameImageBackground}`;

  const { data, error } = await supabase
    .from("mangas")
    .update({ [img]: imageBackgroundPath })
    .eq("id", id)
    .eq("user_id", +session.user.userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // upload image //
  const { error: errorImage } = await supabase.storage
    .from("manga-images")
    .upload(nameImageBackground, image);

  // if ảnh error thì ko đăng lên
  if (errorImage) {
    await supabase.from("mangas").delete().eq("id", data?.id);
    await supabase.storage.from("manga-images").remove([nameImageBackground]);

    throw new Error(
      "Mangas image could not be upload and the manga was not created",
    );
  }

  revalidatePath(`/account/detail/${id}`);
  return data;
}

export async function updateImageSetting(img, formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const image = formData.get("image");
  const id = formData.get("id");

  // Cũng để chuẩn bị update ảnh
  const nameImageBackground = `${Math.random()}-${image.name}`.replaceAll(
    "/",
    "",
  );
  const imageBackgroundPath = `${SUPABASE_URL}/storage/v1/object/public/manga-images/${nameImageBackground}`;

  const { data, error } = await supabase
    .from("settings")
    .update({ [img]: imageBackgroundPath })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // upload image //
  const { error: errorImage } = await supabase.storage
    .from("manga-images")
    .upload(nameImageBackground, image);

  // if ảnh error thì ko đăng lên
  if (errorImage) {
    await supabase.storage.from("manga-images").remove([nameImageBackground]);

    throw new Error(
      "Mangas image could not be upload and the manga was not created",
    );
  }

  revalidatePath(`/account/setting`);
  return data;
}

export async function updateDetailChapter(detail, formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const title = formData.get("title");
  const id = formData.get("id");

  const { data, error } = await supabase
    .from("chapters")
    .update({ [detail]: title })
    .eq("id", id)
    .eq("user_id", +session.user.userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/account/detail/${id}`);
  return data;
}

export async function updateImageChapter(formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const SUPABASE_URL = process.env.SUPABASE_URL;

  const image = formData.get("image");
  const id = formData.get("id");
  const detailId = formData.get("detailId");

  // Cũng để chuẩn bị update ảnh
  const nameImageBackground = `${Math.random()}-${image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/manga-images/${nameImageBackground}`;

  const { data, error } = await supabase
    .from("chapter_images")
    .update({ image: imagePath })
    .eq("id", id)
    .eq("user_id", +session.user.userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // upload image //
  const { error: errorImage } = await supabase.storage
    .from("manga-images")
    .upload(nameImageBackground, image);

  // if ảnh error thì ko đăng lên
  if (errorImage) {
    await supabase.from("mangas").delete().eq("id", data?.id);
    await supabase.storage.from("manga-images").remove([nameImageBackground]);

    throw new Error(
      "Mangas image could not be upload and the manga was not created",
    );
  }

  revalidatePath(`/account/detail/${detailId}/setup/${id}`);
  return data;
}

export async function updateImageNumber(formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const number = formData.get("title");
  const id = formData.get("id");
  const detailId = formData.get("detailId");
  const setupId = formData.get("setupId");

  const getImage = await getImageChapterWithId(setupId);

  const checkTrueFalse = getImage.some((num) => num.number === +number);
  const arrayIwant = getImage.find((imgId) => imgId.id === +id);

  if (checkTrueFalse) {
    getImage.forEach((element, index, array) => {
      // nếu number bé hơn Number hiện tại
      if (+number < arrayIwant.number) {
        if (
          arrayIwant.number > array[index].number &&
          +number <= array[index].number
        ) {
          array[index].number += 1;
        }
      }
      // nếu number lớn hơn Number hiện tại
      if (+number > arrayIwant.number) {
        if (
          arrayIwant.number < array[index].number &&
          +number >= array[index].number
        ) {
          array[index].number -= 1;
        }
      }
    });
    // sau khi chạy xong sẽ kiểm tra xem number và number cũ giống nhau không nếu giống thì sửa
    getImage.forEach(() => {
      if (arrayIwant.number !== +number) {
        arrayIwant.number = +number;
      }
    });
  } else {
    getImage.forEach(() => {
      arrayIwant.number = +number;
    });
  }

  const { data, error } = await supabase
    .from("chapter_images")
    .upsert(getImage, { onConflict: "id" })
    .eq("user_id", +session.user.userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/account/detail/${detailId}/setup/${id}`);
  return data;
}

export async function updateImageUser(formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const SUPABASE_URL = process.env.SUPABASE_URL;

  const image = formData.get("image");

  // Cũng để chuẩn bị update ảnh
  const nameImageBackground = `${Math.random()}-${image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/manga-images/${nameImageBackground}`;

  const { data, error } = await supabase
    .from("users")
    .update({ image: imagePath })
    .eq("id", session.user.userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // upload image //
  const { error: errorImage } = await supabase.storage
    .from("manga-images")
    .upload(nameImageBackground, image);

  // if ảnh error thì ko đăng lên
  if (errorImage) {
    await supabase.storage.from("manga-images").remove([nameImageBackground]);

    throw new Error(
      "Mangas image could not be upload and the manga was not created",
    );
  }
  await unstable_update();

  revalidatePath(`/account`);
  return data;
}

export async function updateNameUser(state, formData) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const title = formData.get("title");

  const existUser = await GetNameUser(title);
  if (existUser) {
    return { error: "Tài khoản đã tồn tại rồi, đổi tên đi" };
  }
  
  const { data, error } = await supabase
    .from("users")
    .update({ fullName: title })
    .eq("id", +session.user.userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  await unstable_update();
  revalidatePath(`/account`);
  return data;
}

// delete ////////////////////////////////////
export async function deleteType(typeId, param_id) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const { error } = await supabase
    .from("manga_genres")
    .delete()
    .eq("id", typeId)
    .eq("user_id", +session.user.userId);

  if (error) {
    throw new Error("delete failed");
  }
  revalidatePath(`/account/detail/${param_id}`);
}

export async function deleteManga(id) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const { error } = await supabase
    .from("mangas")
    .delete()
    .eq("id", id)
    .eq("user_id", +session.user.userId);

  if (error) {
    throw new Error("delete manga failed");
  }

  revalidatePath(`/account`);
}

export async function deleteChapter(chapterId, param_id) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const { error } = await supabase
    .from("chapters")
    .delete()
    .eq("id", chapterId)
    .eq("user_id", +session.user.userId);

  if (error) {
    throw new Error("delete chapter failed");
  }
  revalidatePath(`/account/detail/${param_id}`);
}

export async function deleteImageChapter(id, detailId) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const { error } = await supabase
    .from("chapter_images")
    .delete()
    .eq("id", id)
    .eq("user_id", +session.user.userId);

  if (error) {
    throw new Error("delete image chapter failed");
  }

  revalidatePath(`/account/detail/${detailId}/setup/${id}`);
}

export async function deleteComment(id, mangas_id, chapters_id) {
  const session = await auth();
  if (!session) throw new Error("You need to signIn");

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .eq("users_id", +session.user.userId);

  if (error) {
    throw new Error("delete image chapter failed");
  }

  revalidatePath(`/chapter/${mangas_id}/chap/${chapters_id}`);
}


/////////
export const getMangaformSearch = async function (search) {
  if (!search.trim()) return null;
  if (search.length <3){
    return null
  }

  const { data, error } = await supabase
    .from("mangas")
    .select("*")
    .ilike("title", `%${search}%`)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("get manga failed");
  }

  return data;
};