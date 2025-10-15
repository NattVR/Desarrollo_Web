import { Controller, Post, Body, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { UploadImageDto } from './dto/upload-image.do';
import { AddComment } from './dto/add-comment';
import { AuthGuard } from 'src/security/auth/auth.guard';
import { RoleGuard } from 'src/security/role/role.guard';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}



 @UseGuards(AuthGuard)
 @UseGuards(RoleGuard)

  @Post()
  uploadImage(@Body() uploadImageDto: UploadImageDto): any {
    return this.imageService.uploadImage(uploadImageDto)
  }

  @Post('add/comment')
  addComment(@Body() comment:AddComment ){
    return this.imageService.addComment( comment)
  }

  deleteImage(){

  }

  deleteComment(){    
  } 

  @Get('gallery/:id/:page/:pageSize')
  getGalleryByUserId(@Param('id') userId: string, @Query('page') page: string, @Query('pageSize') pageSize: string) {
    return this.imageService.getGalleryByUserId(userId, +page || 1, +pageSize || 100);
  }

}
