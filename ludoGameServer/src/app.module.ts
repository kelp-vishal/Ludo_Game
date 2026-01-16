import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsGateway } from './rooms/rooms.gateway';

@Module({
  imports: [RoomsModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService,RoomsGateway],
})
export class AppModule {}
