import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService:JwtService){}

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const Request=context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(Request);
    if(!token){
        throw new UnauthorizedException();
    }
    try{
      const payload=await this.jwtService.verifyAsync(token);

      Request['user']= payload;
    }
    catch{
        throw new UnauthorizedException();
    }
    return true;
  }
  extractTokenFromHeader(Request: any): string | undefined {
    const authHeader = Request.headers.authorization;
    const [type, token] = authHeader?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
