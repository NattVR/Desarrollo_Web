import { Injectable } from '@nestjs/common';
import { CommonGuard } from '../common/common.guard';

@Injectable()
export class AuthGuard extends CommonGuard {}
