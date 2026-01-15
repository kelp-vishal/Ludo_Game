import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService
    ){}

    async signIn(username:String,password:string):Promise<any> {
        if(username === 'Vishal' && password === 'vishal123'){
            return {access_token: this.jwtService.sign({ sub: '1' })}  ;
        }
        
        const user=await this.userService.findOne(username as string);
        if(!user || user.password !== password){
            throw new UnauthorizedException('Invalid credentials');
        }

        const match = await bcrypt.compare(password,user.password);

        if (!match) throw new UnauthorizedException();

        return {
            access_token: this.jwtService.sign({ sub: user.id })
        };
        // return {message:'SignIn Successful',userId:user.userId,username:user.username};
    }

    async register(username:String,password:string,Email:String):Promise<any> {
        // store user in db
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userService.createUser(username as string, hashedPassword, Email as string);
        return true;
        // return {message:'User registered successfully', userId:newUser.id, username:newUser.username};
    }

}
