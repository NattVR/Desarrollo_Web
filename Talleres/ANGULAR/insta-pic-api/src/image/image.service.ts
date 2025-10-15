import { Injectable } from '@nestjs/common';
import { UploadImageDto } from './dto/upload-image.do';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddComment } from './dto/add-comment';
import { Comment } from './entities/comment.entity';
import { skip } from 'rxjs';

@Injectable()
export class ImageService {
   
    constructor(
        @InjectRepository(Image)
        private imageRepository:Repository<Image>,
        @InjectRepository(Image)
        private commentRepository:Repository<Comment>,


    ){}

    uploadImage(uploadImageDto:UploadImageDto){
       
        let imageEntity= this.imageRepository.create({...uploadImageDto, user:{id:uploadImageDto.userID} })
        return this.imageRepository.save(imageEntity);
    }

    addComment(comment:AddComment){
        let commentEntity = this.commentRepository.create({
            ...comment,
            user:{id:comment.userId},
            image:{id:comment.imageId}})
        return this.commentRepository.save(commentEntity)
    }

     getGalleryByUserId(userId: string, page:number=1, pageSize:number=100){ {
       /*return this.imageRepository.findBy( { user: { id: userId } });*/
        let skip=(page-1)*pageSize;

       return this.imageRepository.find({ 
        where: { 
            user: {id: userId, isActive:true}},
            relations: {
                comments:true,
                user:true
            },
            select:{
                id:true,
                url:true,
                createdAt:true,
                comments:true,
                user:{
                    id:true,
                    username:true
                }
            },
        order:{ createdAt:'DESC' },
        skip:skip,
        take:pageSize
        });
    }}

}
