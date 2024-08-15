"use server";

import MediaLibraryModel from "@/models/media-library-model";

export const saveMedia = async (payload: any) => {
  try {
    await MediaLibraryModel.create(payload);
    return {
      success: true,
      message: "Media saved successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllMedia = async () => {
  try {
    const media = await MediaLibraryModel.find().sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(media)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteMedia = async (id: string) => {
  try {
    await MediaLibraryModel.findByIdAndDelete(id);
    return {
      success: true,
      message: "Media deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};