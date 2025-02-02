import conf from "../conf/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  //   create post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  //   update post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {}
  }

  //   delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   get a post
  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        slug
      );

      return post;
    } catch (error) {
      throw error;
    }
  }

  //   get all posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const posts = await this.databases.listDocuments(
        conf.appwriteDbId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  //   file upload service
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   file delete service
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   file preview service
  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
