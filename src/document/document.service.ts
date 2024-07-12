import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { updateDocument } from './dto/updateDocument.dto';

@Injectable()
export class DocumentService {
  constructor(private Prisma: PrismaService) {}

  async createDocument(data: string, userId: string) {
    try {
      const newDoc = await this.Prisma.document.create({
        data: {
          parentDocument: data,
          userId: userId,
          content: '',
          title: 'Untitled Document',
        },
      });

      if (newDoc) {
        return {
          success: true,
          statusCode: 201,
          message: 'Document Added Successfully',
          document:newDoc
        };
      } else {
        return {
          success: false,
          statusCode: 403,
          message: 'Failed To Add Document',
        };
      }
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }

  async getDocument(userId,query,raw) {
    try {

      const doc = await this.Prisma.document.findMany({
        where: {
          userId: userId,
          isArchived: false,
          title:{contains:query,mode:"insensitive"}
        },
      });

      if(query != "" && raw){
        console.log("inside serarch",doc)
        return {
          statusCode: 201,
          message: 'Document Fetched Successfully',
          document: doc,
        };
      }

      function buildTree(documents, parentId = null) {
        const children = documents.filter(
          (doc) => doc.parentDocument === parentId,
        );
        if (children.length === 0) return null;

        return children.map((child) => ({
          ...child,
          children: buildTree(documents, child.id),
        }));
      }

      const filteredData = buildTree(doc);

      console.log(filteredData)
      if (doc.length > 0) {
        return {
          statusCode: 201,
          message: 'Document Fetched Successfully',
          document: filteredData,
        };
      } else {
        return {
          statusCode: 201,
          messaage: 'No Document Exist',
          document: doc,
        };
      }
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }

  async getDocumentById(documentId: string) {
    try {
      const doc = await this.Prisma.document.findFirst({
        where: {
          id: documentId,
        },
      });

      if (doc) {
        return { statusCode: 200, message: 'Document Found', document: doc };
      } else {
        return { statusCode: 203, message: 'Document Does Not Exist' };
      }
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }

  async deleteDocument(documentId: string) {
    try {
      const deleteDocument = await this.Prisma.document.deleteMany({
        where: {
          id: documentId,
        },
      });

      if (deleteDocument.count != 0) {
        return { statusCode: 201, message: 'Document Deleted Successfully' };
      } else {
        return { statusCode: 203, message: 'Document Does Not Exist' };
      }
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }

  async updateDocument(documentId: string, data: updateDocument) {
    try {
      const updatedDocument = await this.Prisma.document.update({
        where: {
          id: documentId,
        },
        data: {
          ...data,
        },
      });

      if (updatedDocument) {
        return { statusCode: 201, message: 'Document Saved Successfully' };
      } else {
        return { statusCode: 203, message: 'Failed To Update' };
      }
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }

  async updateArchieve(documentId: string, status: boolean) {
    try {
      const res = await this.Prisma.document.update({
        where: {
          id: documentId,
        },
        data: {
          isArchived: status,
        },
      });
      if (res) {
        return {
          statusCode: 201,
          message: `${status ? 'Archived' : 'UnArchieve'} Successfully`,
        };
      } else {
        return { statusCode: 300, message: 'Internal Server Error' };
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async setContent(document: any, data: any) {
    try {
      const res = await this.Prisma.document.update({
        data: {
          content: data,
        },
        where: {
          id: document,
        },
      });

      if (res) {
        return { statusCode: 201, message: 'Changes Applied' };
      } else {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async rename(document: string, data: string) {
    try {
      const res = await this.Prisma.document.update({
        where: { id: document },
        data:{
          title:data
        }
      });

      if(res){
        return {statusCode:201,message:"Document Updated Successfully"}
      }else{
        return {statusCode:300,message:"Failed To Rename Document"}
      }
    } catch (error) {}
  }

  async getArchieves(user:string) {
    try {
      const res = await this.Prisma.document.findMany({
        where:{
          userId:user,
          isArchived:true
        }
      })

      if(res){
        return {statusCode:201,message:"Archives Fetched Successfully",document:res}
      }else{
        return {statusCode:300,message:"Failed To Rename Document"}
      }
    } catch (error) {}
  }
}



